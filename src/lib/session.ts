import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { hash, compare } from "bcrypt";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function hashPassword(password: string) {
  const hashedPassword = await hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(
  inputPasswrod: string,
  passwordFromDb: string
) {
  return await compare(inputPasswrod, passwordFromDb);
}

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}
