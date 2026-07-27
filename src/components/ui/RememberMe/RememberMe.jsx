import Checkbox from "../Checkbox";

export default function RememberMe({
  checked,
  onChange,
}) {
  return (
    <Checkbox
      id="remember-me"
      checked={checked}
      onChange={onChange}
      label="Remember Me"
    />
  );
}