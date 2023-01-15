# HumanDetection

> În acest proiect, am utilizat platforma de cloud computing de la Google, numită Google Cloud 
> Platform (GCP), pentru a gestiona infrastructura tehnologică necesară. Am utilizat servicii 
> precum Google Compute Engine pentru crearea și rularea de instanțe virtuale, Google Cloud 
> Storage pentru stocarea datelor si Google Firestore pentru baza de date. Acest lucru ne-a 
> permis să ne scalăm și să ne adaptăm nevoilor proiectului în mod eficient, precum și să beneficiem
> de siguranța și performanța oferite de GCP. 


### Servicii Cloud:
![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)
<li> Google Cloud Compute Engine </li>
<li> Google Cloud Storage </li>
<li> Google Firestore </li>
<li> SendGrip Email API </li>
<li> Google Cloud Pub/Sub</li>

---

### Limbaje de programare și tehnologii:
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![OpenCV](https://img.shields.io/badge/opencv-%23white.svg?style=for-the-badge&logo=opencv&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
---

## Configurări GCP

- creare New Project cu numele `Google Cloud Project`

![newProject.png](img%2FnewProject.png)

----

### 1. Google Cloud Compute Engine 
>Google Compute Engine (GCE) este un serviciu de calcul în cloud oferit de Google Cloud Platform 
> care permite utilizatorilor să creeze și să ruleze instanțe virtuale pe infrastructura Google. 
> Acesta oferă acces la resurse de calcul puternice, cum ar fi CPU-uri și memorie, precum și opțiuni 
> de stocare și rețea.
> GCE permite utilizatorilor să creeze instanțe virtuale cu diferite configurații, cum ar fi 
> numărul de CPU-uri și cantitatea de memorie, și să le ruleze pe diferite sisteme de operare, 
> cum ar fi Linux sau Windows. Serviciul oferă, de asemenea, opțiuni de scalare automată, 
> astfel încât instanțele virtuale pot crește sau scădea în funcție de nevoile aplicației.

![computeEngine.png](img%2FcomputeEngine.png)

### `Configurare`
- Pentru a clona VM-ul, vom face o imagine care sa contina starea
  curenta.
- Crearea imaginii
  - `Compute Engine > Images:`
  ![computeEngineImage.jpeg](img%2FcomputeEngineImage.jpeg)
- Crearea imaginii web
  - `Compute Engine > Images:`
![computeEngineImagesWeb.jpeg](img%2FcomputeEngineImagesWeb.jpeg)
---

### 2. Google Storage
> Google Cloud Storage este un serviciu de stocare de obiecte de la Google Cloud Platform (GCP) 
> care oferă utilizatorilor acces la o capacitate de stocare nelimitată în Cloud. Serviciul oferă 
> opțiuni de stocare cum ar fi: Google Cloud Storage Standard, Google Cloud Storage Nearline și 
> Google Cloud Storage Coldline. Acestea sunt diferențiate prin nivelurile de disponibilitate, 
> performanță și cost. Google Cloud Storage permite utilizatorilor să stocheze și să acceseze fișiere 
> de orice tip, cum ar fi imagini, video, audio și documente. 
> Serviciul oferă, de asemenea, instrumente 
> puternice de gestionare a obiectelor stocate, cum ar fi etichetarea automată, arhivarea automată și 
> backup-ul automat. Google Cloud Storage este bine integrat cu alte servicii GCP, cum ar fi Google 
> Compute Engine și Google BigQuery, permițând utilizatorilor să construiască aplicații și soluții de 
> analiză de date în cloud.

![cloudStorage.png](img%2FcloudStorage.png)

### `Configurare`

- Fiecare utilizator va avea propriul lui `bucket` creat automat atunci când se înregistrează și încarcă o nouă arhivă pe site-ul nostru.
- Pentru a putea integra Google Storage în aplicația noastră, este necesar să generăm un set de credențiale noi:
  - `APIs & Services > Credentials`:
  ![cloudStorage.png](img%2FcloudStorage.png)
  - `CREATE CREDENTIALS > Service account`:
  ![step1.png](img%2Fstorage%2Fstep1.png)
  - `CREATE AND CONTINUE`:
  ![step2.png](img%2Fstorage%2Fstep2.png)
  - `CONTINUE` și fără a selecta altceva `DONE`:
  ![step3.png](img%2Fstorage%2Fstep3.png)
  - Pentru a crea o cheie nouă selectăm Service Account-ul nou creat:
  ![step4.png](img%2Fstorage%2Fstep4.png)
  - `KEYS > ADD KEY > Create new key > JSON (Key type) > CREATE` și cheia se va salva local:
  ![step5.png](img%2Fstorage%2Fstep5.png)
  
---

### 3. Google Firestore
> Firestore este un serviciu de baze de date NoSQL de documente oferit de Google Cloud Platform. 
> Acesta permite stocarea, sincronizarea și interogarea unui volum mare de date structurate și 
> nestructurate, cum ar fi documente JSON. Firestore este un serviciu de bază de date orientat pe 
> documente, care înseamnă că datele sunt organizate în colecții de documente, fiecare dintre 
> acestea conținând câmpuri și subcolecții. <br>
> Firestore oferă o scalabilitate automată, astfel încât aplicațiile pot crește și scădea în mod 
> dinamic, fără a fi nevoie de administrare manuală. Serviciul este optimizat pentru aplicațiile 
> web și mobile și oferă suport pentru aplicații offline, astfel încât datele pot fi accesate și 
> actualizate chiar și atunci când utilizatorul nu este conectat la internet. <br>
> Firestore oferă, de asemenea, un sistem puternic de permisiuni și reglementări, care permite 
> controlul accesului la date și protejarea acestora împotriva accesului neautorizat.

![firestore.png](img%2Ffirestore.png)

### `Configurare`
  - `SELECT NATIVE MODE`:
  ![step1.png](img%2Ffirestore%2Fstep1.png)
  - `Select a location (eur3 Europe) > CREATE DATABASE`:
  ![step2.png](img%2Ffirestore%2Fstep2.png)
  - Creăm o nouă colecție `START COLLECTION > Collectio ID (users) > SAVE`:
  ![step3.png](img%2Ffirestore%2Fstep3.png)
  - Pentru fiecare utilizator se va crea câte un document în care vom salva credențialele sale
---

### 4. SendGrip Email API
> SendGrid este un serviciu de livrare de e-mail care permite afacerilor și dezvoltatorilor 
> să trimită și să gestioneze comunicări prin e-mail. Acesta oferă o interfață de programare 
> a aplicației (API) de e-mail, care permite dezvoltatorilor să integreze funcționalități 
> de e-mail în aplicațiile lor și să gestioneze liste de distribuție, rapoarte și alte opțiuni 
> de personalizare.
> SendGrid Email API poate fi integrat cu Google Cloud Platform (GCP) pentru a se beneficia 
> de scalabilitatea și performanța oferite de GCP în combinație cu puterea și flexibilitatea 
> oferite de SendGrid Email API.
> Integrarea poate fi realizată prin intermediul diferitelor servicii GCP cum ar fi 
> Compute Engine sau App Engine, pentru a gestiona și a trimite e-mailuri în masă. 
> De asemenea, prin intermediul serviciilor de stocare cum ar fi Google Cloud Storage 
> sau Firebase Storage, se pot salva atașamentele sau imagini in cloud.

![sendGrip.png](img%2FsendGrip.png)

### `Configurare`
  - `VIEW ALL PLANS > FREE`:
  ![step1.png](img%2Fsendgrip%2Fstep1.png)
  - `CREATE > SIGN UP WITH SENDGRID`:
  ![step2.png](img%2Fsendgrip%2Fstep2.png)
  - După crearea contului de SendGrid va trebui să creăm un nou Sender `Settings > Sender Authentication`:
  ![step3.png](img%2Fsendgrip%2Fstep3.png)
  - După care un set nou de API Key-uri cu Full Access `Settings > API Keys > Create API Key`
  ![step4.png](img%2Fsendgrip%2Fstep4.png)
---

### 5. Google Cloud Pub/Sub
> Google Cloud Pub/Sub este un serviciu de mesagerie asincronă oferit de Google Cloud Platform
> care permite aplicațiilor să comunice prin intermediul mesajelor. Acesta oferă o arhitectură 
> de mesagerie bazată pe publicarea și abonarea de mesaje, care permite aplicațiilor să trimită 
> și să primească mesaje în mod independent, fără a fi nevoie de o conexiune directă între ele.
> Pub/Sub oferă o scalabilitate automată, astfel încât aplicațiile pot crește și scădea în 
> mod dinamic, fără a fi nevoie de administrare manuală. Serviciul oferă, de asemenea, un 
> sistem de livrare de mesaje fiabil, care asigură că mesajele sunt livrate în mod corespunzător 
> și în ordine.

![pubSub.png](img%2FpubSub.png)

### `Configurare`
  - `CREATE TOPIC > Add a default subscription > Google-managed encryption key > CREATE TOPIC`
  ![step1.png](img%2Fpub-sub%2Fstep1.png)
  - Creăm set nou de credențiale `IAM & Admin > serbice Accounts > CREATE SERVICE ACCOUNT`:
  ![step2.png](img%2Fpub-sub%2Fstep2.png)
  - `CREATE AND CONTINUE`:
  ![step3.png](img%2Fpub-sub%2Fstep3.png)
  - `Role > Pub/Sub > Pub/Sub Admin`:
  ![step4.png](img%2Fpub-sub%2Fstep4.png)
  - `CONTINUE` și fără a selecta altceva `DONE`:
  ![step5.png](img%2Fpub-sub%2Fstep5.png)
  - Pentru a crea o cheie nouă selectăm Service Account-ul nou creat, apoi `KEYS > ADD KEY > Create new key > JSON (Key type) > CREATE` și cheia se va salva local:
  ![step6.png](img%2Fpub-sub%2Fstep6.png)
---

### Realizat de:
* Laurențiu-Vasile Crețu 
* Nicoleta-Anastasia Dinoiu
* Cătălin-Gabriel Spătaru