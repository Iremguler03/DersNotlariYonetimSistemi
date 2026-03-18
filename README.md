## Projenin Amacı
Bu projenin amacı, kullanıcıların ders notlarını kolayca yönetebileceği bir web uygulaması geliştirmektir. Kullanıcılar bu sistem sayesinde:

- Hesap oluşturabilir ve giriş yapabilir,
- Ders notlarını ekleyebilir, görüntüleyebilir ve güncelleyebilir,
- Dosya yükleyebilir ve notlarına ekleyebilir,
- Notlarını geçici olarak silebilir (soft delete) ve gerektiğinde kalıcı olarak arşivden silebilir.



## Kurulum ve Çalıştırma

cd DersNotlariYonetimSistemi\backend\DersNotlariYonetimSistemi.API
dotnet restore
dotnet build
dotnet run


cd DersNotlariYonetimSistemi\frontend\dersnotlari-frontend
npm install
npm start

--Git--
cd DersNotlariYonetimSistemi 
git init 
git add . 
git commit -m "deneme10" 
git push origin main 



## Kullanılan Teknolojiler ve Kütüphaneler
Bu projede aşağıdaki teknolojiler ve kütüphaneler kullanılmıştır:
### Backend
- **C# ve .NET 7** – API geliştirme ve iş mantığı.
- **Entity Framework Core** – Veritabanı işlemleri.
- **MS SQL Server** – Veritabanı yönetimi.
- **JWT (JSON Web Token)** – Kullanıcı doğrulama ve güvenlik.

### Frontend
- **React** – Kullanıcı arayüzü geliştirme.
- **React Router Dom** – Sayfa yönlendirmeleri.
- **Axios** – API istekleri için HTTP istemcisi.
- **Material-UI** – UI bileşenleri ve tasarım.
- **React Hook Form** – Form yönetimi ve doğrulama.

### Diğer
- **Git** – Versiyon kontrolü.



## API Uç Noktaları (Endpoints) Açıklamaları

### Auth (Kimlik Doğrulama)
| HTTP Metodu | Endpoint            | Açıklama                                  | Gönderilen Veri |
|------------|-------------------|------------------------------------------|----------------|
| POST       | `/auth/register`   | Yeni kullanıcı kaydı                      | `{ username, password }` |
| POST       | `/auth/login`      | Kullanıcı girişi ve JWT token alma       | `{ username, password }` |

### Notes (Ders Notları)
| HTTP Metodu | Endpoint             | Açıklama                                     | Gönderilen Veri / Parametre |
|------------|--------------------|---------------------------------------------|-----------------------------|
| GET        | `/notes`            | Tüm notları listele                         | Header: Authorization: Bearer <token> |
| GET        | `/notes/:id`        | ID ile belirli bir notu getir               | Header: Authorization: Bearer <token> |
| POST       | `/notes`            | Yeni not ekle                               | `{ title, content, file? }` |
| PUT        | `/notes/:id`        | Var olan notu güncelle                      | `{ title, content, file? }` |
| DELETE     | `/notes/:id`        | Notu soft delete ile sil                     | Header: Authorization: Bearer <token> |
| DELETE     | `/notes/archive/:id`| Kalıcı olarak arşivden sil                   | Header: Authorization: Bearer <token> |

### Users (Kullanıcı Yönetimi)
| HTTP Metodu | Endpoint           | Açıklama                                   | Gönderilen Veri |
|------------|------------------|-------------------------------------------|----------------|
| GET        | `/users`           | Tüm kullanıcıları listele (admin)         | Header: Authorization: Bearer <token> |
| GET        | `/users/:id`       | Belirli kullanıcıyı getir                 | Header: Authorization: Bearer <token> |
| PUT        | `/users/:id`       | Kullanıcı bilgilerini güncelle             | `{ username, password? }` |
| DELETE     | `/users/:id`       | Kullanıcıyı sil                            | Header: Authorization: Bearer <token> |
