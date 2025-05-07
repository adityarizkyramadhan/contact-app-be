**API specs (README)**

---

# 📘 User API - Documentation

---

## 🔐 Authentication

> Semua endpoint (kecuali login/register) memerlukan autentikasi dengan token.

Gunakan `Authorization: Bearer <token>` di header permintaan.

---

## 📋 Endpoints

### ✅ Auth

#### `POST /auth/register`

Register user baru.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "securepassword",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "id": 1,
  "token": "generated_token"
}
```

---

#### `POST /auth/login`

Login user.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "token": "generated_token"
}
```

---

### 👤 User

#### `GET /users/me`

Ambil data user yang sedang login.

**Headers:**
`Authorization: Bearer <token>`

**Response:**

```json
{
  "id": 1,
  "username": "johndoe",
  "name": "John Doe",
  "created_at": "2025-05-07T09:00:00.000Z"
}
```

---

### 📞 Contact

#### `GET /contacts`

Ambil semua contact milik user.

**Response:**

```json
[
  {
    "id": 1,
    "name": "Alice",
    "contact": "alice@example.com",
    "type": "WORK"
  }
]
```

---

#### `POST /contacts`

Tambah contact baru.

**Request Body:**

```json
{
  "name": "Alice",
  "contact": "alice@example.com",
  "type": "WORK"
}
```

---

#### `PUT /contacts/:id`

Update contact.

**Request Body:**

```json
{
  "name": "Alice Updated",
  "contact": "alice.new@example.com",
  "type": "PERSONAL"
}
```

---

#### `DELETE /contacts/:id`

Hapus contact.

---

### 📍 Address

#### `GET /addresses`

Ambil semua address milik user.

---

#### `POST /addresses`

Tambah address baru.

**Request Body:**

```json
{
  "address": "Jl. Merdeka No.10",
  "city": "Jakarta",
  "state": "DKI Jakarta",
  "country": "Indonesia",
  "postal_code": "10110",
  "is_default": true
}
```

---

#### `PUT /addresses/:id`

Update address.

---

#### `DELETE /addresses/:id`

Hapus address.

---

### 🔁 Notes

* Field `created_at` dan `updated_at` dikelola otomatis.
* Setiap `Contact` dan `Address` terhubung ke `User` melalui foreign key `user_id`.
* Menghapus user akan secara otomatis menghapus kontak dan alamat terkait (`onDelete: Cascade`).
