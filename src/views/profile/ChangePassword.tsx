import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

import UserService from "@services/user.service";
import { useState } from "react";

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: UserService.changePassword,
    onSuccess: () => {
      toast.success("Contraseña cambiada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (formData.get("newPassword") !== formData.get("confirmPassword")) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    mutate({
      password: formData.get("currentPassword")?.toString()!,
      newPassword: formData.get("newPassword")?.toString()!,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="currentPassword">Contraseña actual</label>
        <input
          className="input input-bordered"
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="newPassword">Nueva Contraseña</label>
        <div className="flex gap-1">
          <input
            className="input input-bordered flex-grow"
            id="newPassword"
            name="newPassword"
            type={showPassword ? "text" : "password"}
            required
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? <IconEye /> : <IconEyeClosed />}
          </button>
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
        <div className="flex gap-1">
          <input
            className="input input-bordered flex-grow "
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            required
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? <IconEye /> : <IconEyeClosed />}
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit" disabled={isPending} className="btn btn-primary">
          {isPending ? (
            <div className="loader loader-spipner" />
          ) : (
            "Cambiar contraseña"
          )}
        </button>
      </div>
    </form>
  );
}
