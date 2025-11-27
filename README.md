# 📋 Questionnaire de Validation des Compétences - Qualiopi

Application web moderne de validation des acquis de formation, conforme aux exigences **Qualiopi**.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

---

## 🎯 Objectif

Cette application permet aux **formateurs** de valider les acquis de leurs apprenants à l'issue d'une formation, en conformité avec les critères **Qualiopi** (traçabilité, preuve d'évaluation, archivage).

### Fonctionnalités principales

- ✅ **Quiz interactif** : 10 questions à choix multiples sur les techniques de vente
- 📊 **Résultats immédiats** : Score et correction détaillée affichés instantanément
- 🔐 **Interface Admin sécurisée** : Consultation et export des résultats (CSV)
- 💾 **Stockage Postgres** : Sauvegarde automatique dans une base de données Vercel Postgres
- 📱 **Responsive** : Fonctionne sur mobile, tablette et desktop

---

## 🏗️ Architecture Technique

### Stack

- **Frontend** : Next.js 16 (App Router) + React + TypeScript
- **Styling** : Tailwind CSS + Lucide Icons
- **Backend** : Next.js API Routes (Serverless)
- **Base de données** : Vercel Postgres (Neon)
- **Hébergement** : Vercel (Déploiement continu depuis GitHub)

### Structure du projet

```
qualiopi-next/
├── app/
│   ├── page.tsx                 # Page principale (Quiz)
│   ├── admin/
│   │   └── page.tsx             # Interface Admin
│   └── api/
│       ├── submit/route.ts      # Soumission des réponses
│       ├── results/route.ts     # Récupération des résultats
│       └── seed/route.ts        # Initialisation de la base
├── components/
│   └── Quiz.tsx                 # Composant principal du quiz
├── lib/
│   └── questions.ts             # Base de données des questions
└── README.md
```

---

## 🚀 Déploiement

### Prérequis

- Compte [Vercel](https://vercel.com) (gratuit)
- Compte [GitHub](https://github.com) (gratuit)
- Base de données Postgres (Neon via Vercel Marketplace)

### Étapes de déploiement

#### 1. Cloner le dépôt

```bash
git clone https://github.com/Lofp34/Questionnaire_Validation_Competences.git
cd Questionnaire_Validation_Competences
```

#### 2. Installer les dépendances

```bash
npm install
```

#### 3. Déployer sur Vercel

1. Connectez-vous sur [Vercel](https://vercel.com)
2. Cliquez sur **"Add New Project"**
3. Importez le dépôt GitHub `Questionnaire_Validation_Competences`
4. Cliquez sur **"Deploy"**

#### 4. Configurer la base de données

1. Dans votre projet Vercel, allez dans l'onglet **Storage**
2. Cliquez sur **"Create Database"** ou sélectionnez **Neon** dans le Marketplace
3. Choisissez le plan **Free**
4. Dans **Custom Prefix**, entrez : `POSTGRES`
5. Validez la création

#### 5. Initialiser la base de données

Une fois le déploiement terminé :

1. Ouvrez l'URL de votre application (ex: `https://votre-app.vercel.app`)
2. Ajoutez `/api/seed` à la fin de l'URL
3. Vous devriez voir : `{"message":"Database seeded successfully"}`

✅ **Votre application est maintenant opérationnelle !**

---

## 📖 Utilisation

### Pour les apprenants

1. Accédez à l'URL de l'application
2. Saisissez votre **Nom et Prénom**
3. Répondez aux **10 questions**
4. Cliquez sur **"Valider mes réponses"**
5. Consultez votre **score** et la **correction détaillée**

### Pour le formateur (Admin)

1. Accédez à : `https://votre-app.vercel.app/admin`
2. Entrez le mot de passe : `admin2024` (par défaut)
3. Consultez la liste des résultats
4. **Cliquez sur une ligne** pour voir le détail des réponses
5. Exportez les données en **CSV** pour vos dossiers Qualiopi

#### Changer le mot de passe Admin

1. Dans Vercel, allez dans **Settings** > **Environment Variables**
2. Ajoutez une variable `ADMIN_PASSWORD` avec votre mot de passe
3. Redéployez l'application

---

## 🛠️ Développement local

### Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000)

### Variables d'environnement

Créez un fichier `.env.local` :

```env
POSTGRES_URL="postgresql://..."
ADMIN_PASSWORD="votre_mot_de_passe"
```

### Build de production

```bash
npm run build
npm start
```

---

## 📊 Base de données

### Structure de la table `results`

| Colonne       | Type                  | Description                          |
|---------------|-----------------------|--------------------------------------|
| `id`          | SERIAL PRIMARY KEY    | Identifiant unique                   |
| `name`        | VARCHAR(255)          | Nom de l'apprenant                   |
| `score`       | VARCHAR(50)           | Score (ex: "8/10")                   |
| `details`     | JSONB                 | Détails des réponses (JSON)          |
| `created_at`  | TIMESTAMP             | Date et heure de passage             |

### Exemple de requête SQL

```sql
SELECT name, score, created_at 
FROM results 
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;
```

---

## 🔧 Personnalisation

### Modifier les questions

Éditez le fichier `lib/questions.ts` :

```typescript
export const QUESTIONS: Question[] = [
  {
    id: "q1",
    text: "Votre question ici ?",
    options: [
      "Réponse A",
      "Réponse B",
      "Réponse C",
      "Réponse D"
    ],
    correct: 1 // Index de la bonne réponse (0-based)
  },
  // ...
];
```

### Modifier le seuil de réussite

Dans `lib/questions.ts` ou `components/Quiz.tsx`, changez :

```typescript
const PASS_THRESHOLD = 7; // 7/10 pour valider
```

---

## 📄 Licence

Ce projet est développé pour **SARL LAURENT SERRE** dans le cadre de formations certifiées Qualiopi.

---

## 🤝 Support

Pour toute question ou assistance :

- **Email** : ls@laurentserre.com
- **Téléphone** : 06 14 94 40 60
- **Adresse** : 259 rue de la Lavande, 34130 Mauguio

---

## 🔄 Mises à jour

Pour mettre à jour l'application après modification du code :

```bash
git add .
git commit -m "Description des changements"
git push
```

Vercel redéploiera automatiquement la nouvelle version.

---

**Développé avec ❤️ par Laurent Serre - Formation & Conseil en Vente**
