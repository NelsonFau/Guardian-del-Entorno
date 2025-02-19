# **📌 Documentación del UserController**
## **Base URL:**  
📍 `https://mammal-excited-tarpon.ngrok-free.app/api/user`

---

## **1️⃣ Login de usuario**  
🔹 **Descripción:** Permite a un usuario autenticarse en la API.  
🔹 **Método:** `POST`  
🔹 **Endpoint:**  
```
https://mammal-excited-tarpon.ngrok-free.app/api/user/creat?secret=TallerReact2025!
```
🔹 **Body (JSON):**  
```json
{
  "email": "usuarioEjemplo",
  "password": "contraseñaSegura"
}
```
🔹 **Respuesta esperada:**  
```json
{
  "Success": true,
  "Message": "Inicio de sesión exitoso"
}
```
🔹 **Errores posibles:**
- `403 Forbidden` → **Acceso denegado** (Código secreto incorrecto)
- `500 Internal Server Error` → **Error interno**

---

## **2️⃣ Registro de usuario**  
🔹 **Descripción:** Registra un nuevo usuario en la API.  
🔹 **Método:** `POST`  
🔹 **Endpoint:**  
```
https://mammal-excited-tarpon.ngrok-free.app/api/user/register?secret=TallerReact2025!
```
🔹 **Body (JSON):**  
```json
{
  "username": "nuevoUsuario",
  "email": "correo@ejemplo.com",
  "password": "contraseñaSegura"
}
```
🔹 **Respuesta esperada:**  
```json
{
  "Success": true,
  "Message": "Usuario registrado correctamente"
}
```
🔹 **Errores posibles:**
- `403 Forbidden` → **Acceso denegado** (Código secreto incorrecto)
- `500 Internal Server Error` → **Error interno**

---

## **3️⃣ Verificar si la API está en línea**  
🔹 **Descripción:** Comprueba si la API está activa y respondiendo.  
🔹 **Método:** `GET`  
🔹 **Endpoint:**  
```
https://mammal-excited-tarpon.ngrok-free.app/api/user/isAlive?secret=TallerReact2025!
```
🔹 **Respuesta esperada:**  
```json
{
  "Success": true,
  "Message": "API is running"
}
```
🔹 **Errores posibles:**
- `403 Forbidden` → **Acceso denegado** (Código secreto incorrecto)

---

📢 **Notas importantes:**
- **Todos los endpoints requieren el `secret=TallerReact2025!` en la URL.**
- **Los métodos `POST` requieren enviar un `body` en formato JSON.**

