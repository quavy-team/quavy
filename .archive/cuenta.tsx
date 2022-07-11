import { Button, Input, Link, Modal, Text, useInput, useModal } from "@nextui-org/react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { useCallback, useEffect, useMemo } from "react";
import { auth } from "src/app";
import { handle } from "src/utils";
import create from "zustand";

// const valid = (value: string) => !!value.match(/.+?@.+?\..+?/g)
// const secure = (value: string) => !!value.match(/^(?=.*\w)(?=.*\d).{8,}$/g);

const useStore = create((set: Function, get: Function) => ({
  set,
  email: "",
  pword: "",
  signedIn: !!auth.currentUser,
  signingIn: false,
  signingUp: false,
  recovering: false,
  willSignIn: () => set({ signingIn: true }),
  wontSignIn: () => set({ signingIn: false }),
  willSignUp: () => set({ signingUp: true }),
  wontSignUp: () => set({ signingUp: false }),
  willRecover: () => set({ recovering: true }),
  wontRecover: () => set({ recovering: false }),
  // valid: useMemo(() => {
  //   const value = get().email
  //   return value ? value.search(/./g) ? "success" : "error" : ""
  // }, [get]),
  // secure: useMemo(() => {
  //   const value = get().pword;
  //   return value ? value.search(/./g) ? "success" : "error" : ""
  // }, [get]),
  // progress: useMemo(() => {
  //   const value: string = get().pword;
  //   var n = 0;
  //   value.match(/.{6,}/m) && n++
  //   value.match(/\d/m) && n++
  //   value.match(/\w/g) && n++
  // }, [get])
}));

const useValues = (email, password?) => {
  const set = useStore((store) => store.set);
  useEffect(() => {
    email ? (password ? set({ email, password }) : set({ email })) : set({ password });
  }, [set, email, password]);
};

export default function Cuenta() {
  const set = useStore((store) => store.set);
  const signedIn = useStore((store) => store.signedIn);
  const signingIn = useStore((store) => store.signingIn);
  const signingUp = useStore((store) => store.signingUp);
  const recovering = useStore((store) => store.recovering);
  auth.onAuthStateChanged((user) => set({ signedIn: !!user }));
  useStore.subscribe(console.log);
  return signedIn ? (
    <SignedIn />
  ) : signingUp ? (
    <SignUp />
  ) : signingIn ? (
    recovering ? (
      <RecoverPWord />
    ) : (
      <SignIn />
    )
  ) : (
    <SignedOut />
  );
}

function SignedIn() {
  const { currentUser } = auth;
  return (
    <>
      <Text h1>{currentUser.displayName}</Text>
      <Button onClick={() => auth.signOut()}>Cerrar sesion</Button>
    </>
  );
}

function SignedOut() {
  const google = () => signInWithPopup(auth, new GoogleAuthProvider());
  const email = useStore((store) => store.email);
  const willSignIn = useStore((store) => store.willSignIn);
  const willSignUp = useStore((store) => store.willSignUp);
  const { value, bindings } = useInput(email);
  useValues(value);
  return (
    <>
      <Text h1>Iniciar sesion</Text>
      <Input placeholder="email" {...bindings} />
      <Button onClick={willSignIn}>Siguiente</Button>
      <Button onClick={google}>Continuar con Google</Button>
      <Text>
        No tienes una cuenta? <Link onClick={willSignUp}>Registrate</Link>
      </Text>
    </>
  );
}

function SignIn() {
  const pvalue = useStore((store) => store.pword);
  const wontSignIn = useStore((store) => store.wontSignIn);
  const willRecover = useStore((store) => store.willRecover);
  const pword = useInput(pvalue);
  useValues(null, pword.value);
  return (
    <>
      <Text h1>Iniciar sesion</Text>
      <Input.Password placeholder="contraseña" {...pword.bindings} />
      <Link onClick={willRecover}>Me olvide mi contraseña</Link>
      <Button onClick={wontSignIn}>Cancelar</Button>
    </>
  );
}

function SignUp() {
  const set = useStore((store) => store.set);
  const wontSignUp = useStore((store) => store.wontSignUp);
  const modal = useModal();
  const uname = useInput("");
  const email = useInput(useStore((store) => store.email));
  const pword = useInput(useStore((store) => store.pword));
  const open = useCallback(() => modal.setVisible(true), [modal]);
  const close = useCallback(() => modal.setVisible(false), [modal]);
  const signUp = useCallback(async () => {
    const promise = createUserWithEmailAndPassword(auth, email.value, pword.value);
    const [res, err] = await handle(promise);
    if (err) return console.log(err);
    await updateProfile(res.user, { displayName: uname.value });
    set({ signedIn: true });
  }, [set, email.value, pword.value, uname.value]);
  useValues(email.value, pword.value);

  return (
    <>
      <Text h1>Crear cuenta</Text>
      <Input placeholder="email" {...email.bindings} />
      <Input.Password placeholder="password" {...pword.bindings} />
      <Button onClick={open}>Siguiente</Button>
      <Text>
        ya tienes una cuenta? <Link onClick={wontSignUp}>Iniciar sesion</Link>
      </Text>
      <Modal preventClose {...modal.bindings}>
        <Modal.Header>
          <Text h3>Ultimos pasos!</Text>
        </Modal.Header>
        <Modal.Body>
          <Input placeholder="username" {...uname.bindings} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={close}>
            Cancelar
          </Button>
          <Button auto onClick={signUp}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function RecoverPWord() {
  const wontRecover = useStore((store) => store.wontRecover);
  const email = useInput(useStore((store) => store.email));
  const recover = () => sendPasswordResetEmail(auth, email.value);
  useValues(email.value);
  return (
    <>
      <Text h1>Recuperar contraseña</Text>
      <Input placeholder="email" {...email.bindings} />
      <Button onClick={recover}>Enviar email</Button>
      <Button onClick={wontRecover}>Cancelar</Button>
    </>
  );
}
