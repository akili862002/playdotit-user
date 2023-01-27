import { Auth } from "@/utils/auth/auth.utils";
import { ConfirmationResult, RecaptchaVerifier } from "firebase/auth";

declare module "file-saver";

declare global {
  type IIconSVGProps = React.SVGProps<SVGSVGElement>;
  var auth: Auth;
  var isInitAuth: boolean;
  interface Window {
    confirmResult: ConfirmationResult | null;
    recaptchaVerifier: RecaptchaVerifier | null;
  }
}
