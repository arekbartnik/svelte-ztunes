# svelte ztunes

- this is a Svelte version of [ztunes](https://github.com/rocicorp/ztunes/tree/main)
- additionally uses [graffiti](https://github.com/stolinski/graffiti/tree/main) for styling

# Get started

1. Install [Docker](https://docker.com/)
2. `cp .env.example .env`, then fill in all the required vars
3. Install dependencies:
```bash
npm install
```

3. Start, migrate and seed DB:
```bash
npm run db:start
npm run db:migrate
npm run db:seed
```

4. Start zero-cache:
```bash
npm run dev:zero
```

5. Start the app:
```bash
npm run dev:app
```
