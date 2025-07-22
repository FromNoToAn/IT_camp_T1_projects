export async function login(email: string, password: string) {
  let res: Response;

  try {
    res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
  } catch (e: any) {
    throw new Error("Сервер недоступен (fetch error)");
  }

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Неверный email или пароль");
    }
    const text = await res.text();
    throw new Error(`Ошибка сервера: ${res.status} ${text}`);
  }

  return res.json();
}

export async function getMe() {
  const res = await fetch("/api/v1/auth/me", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Не авторизован");
  }
  return res.json();
}

export async function getUsers() {
  const res = await fetch("/api/v1/users", { credentials: "include" });
  if (!res.ok) throw new Error("Ошибка загрузки пользователей");
  return res.json();
}

export async function getUserById(id: string | number) {
  const res = await fetch(`/api/v1/users/${id}`, { credentials: "include" });
  if (!res.ok) throw new Error("Ошибка загрузки пользователя");
  return res.json();
}

export async function createUser(data: any) {
  const res = await fetch("/api/v1/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 409) {
      try {
        const errorData = await res.json();
        if (errorData?.message === "Already Exist") {
          throw new Error("Пользователь уже существует");
        }

        throw new Error(errorData?.message || "Пользователь уже существует");
      } catch {
        throw new Error("Пользователь уже существует");
      }
    } else {
      throw new Error("Ошибка создания пользователя");
    }
  }

  return res.json();
}

export async function updateUser(id: string | number, data: any) {
  const res = await fetch(`/api/v1/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Ошибка обновления пользователя");
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function deleteUser(id: string | number) {
  const response = await fetch(`/api/v1/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Ошибка удаления пользователя");
  }

  return id;
}

export async function logout() {
  const res = await fetch("/api/v1/auth/logout", {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Ошибка выхода из системы");
  return res.json();
}
