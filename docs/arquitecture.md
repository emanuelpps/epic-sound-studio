# Arquitectura propuesta (Next.js 16 + Tailwind CSS v4)

Este documento define una arquitectura inicial para **Epic Sound Studio** pensando en crecer por fases:

1. **Fase 1 (ahora):** reproducción libre sin login.
2. **Fase 2:** autenticación, playlists y favoritos persistidos en tu base de datos.

---

## Objetivos de arquitectura

- Escalar sin convertir el proyecto en una carpeta gigante.
- Separar responsabilidades: UI, dominio, API externa (Audius), estado y utilidades.
- Hacer fácil la evolución hacia login/registro sin reescribir todo.

---

## Estructura de carpetas recomendada

```txt
app/
  (marketing)/
    page.tsx   
  (player)/
    app/
      page.tsx                  # Home de la app (explorar música)
      layout.tsx                # Shell del player (sidebar, now-playing)
      search/
        page.tsx
      track/
        [id]/
          page.tsx
      artist/
        [handle]/
          page.tsx
      playlist/
        [id]/
          page.tsx
  api/
    health/route.ts             # Check básico
  layout.tsx                    # Layout raíz
  globals.css
page.tsx  # Landing pública (pitch corto)


src/
  features/
    landing/
      components/
      sections/
    player/
      components/
      hooks/
    search/
      components/
      hooks/
    track/
      components/
      hooks/
    artist/
      components/
      hooks/
    playlist/
      components/
      hooks/

  entities/
    track/
      model.ts                  # Tipos/validaciones de Track
    artist/
      model.ts
    playlist/
      model.ts

  services/
    audius/
      client.ts                 # Cliente HTTP base
      endpoints/
        tracks.ts
        users.ts
        playlists.ts
      mappers/
        track.mapper.ts         # Adaptación API -> modelo interno

  state/
    player-store.ts             # Estado global del reproductor
    queue-store.ts

  shared/
    components/
      ui/
        button.tsx
        input.tsx
        card.tsx
      layout/
        app-shell.tsx
    hooks/
      use-debounce.ts
      use-audio-player.ts
    lib/
      env.ts                    # Validación de variables de entorno
      fetcher.ts                # Wrapper fetch con errores tipados
      format.ts
    config/
      routes.ts
      site.ts
    styles/
      tokens.css
    types/
      api.ts
```

> Si prefieres mantener `app/` en raíz (como ahora), no hay problema. `src/` puede coexistir para el código de dominio y UI reutilizable.

---

## Rutas y experiencia de usuario (sin auth)

### 1) Landing (`/`)

- Hero breve: qué es la plataforma.
- 3 beneficios claros.
- CTA principal: **“Entrar a escuchar”** → `/app`.
- CTA secundario: “Ver tendencias”.

### 2) App de música (`/app`)

- Feed inicial con tendencias.
- Buscador global.
- Reproductor persistente en layout de `(player)`.

### 3) Detalle de contenido

- `/track/[id]`
- `/artist/[handle]`
- `/playlist/[id]`

---

## Capas recomendadas (regla simple)

1. **`features/`**: casos de uso de UI (buscar, reproducir, ver track).
2. **`entities/`**: tipos y reglas de negocio base.
3. **`services/`**: integración externa (Audius).
4. **`shared/`**: piezas genéricas reutilizables.
5. **`state/`**: estado transversal (cola, reproducción actual).

Esto evita mezclar “llamadas a API” dentro de componentes de pantalla.

---

## Integración con Audius (sin acoplarte)

Usa un patrón “adaptador”:

- `services/audius/endpoints/*`: consume endpoints crudos.
- `services/audius/mappers/*`: transforma respuesta de Audius a tu modelo interno.
- `entities/*/model.ts`: define el shape que usa tu app.

Así, si mañana cambias de proveedor o mezclas varias APIs, tu UI casi no se toca.

---

## Convenciones prácticas

- **Server Components por defecto** en `app/`.
- **Client Components solo cuando haga falta** (`use client` para audio controls, eventos, stores).
- Centraliza variables en `shared/lib/env.ts`.
- Maneja errores de red en `shared/lib/fetcher.ts`.
- Evita rutas “planas gigantes”; usa route groups `(marketing)` y `(player)`.

---

## Plan de implementación (orden sugerido)

1. Crear route groups `(marketing)` y `(player)`.
2. Implementar shell de `/app` con player fijo.
3. Conectar `services/audius/client.ts` + `tracks.ts` (trending).
4. Crear `entities/track/model.ts` + mapper.
5. Implementar búsqueda (`/app/search`).
6. Agregar estado global de reproducción (cola + track actual).
7. (Fase siguiente) auth + favoritos + playlists propias.

---

## Qué evitar desde el inicio

- Meter toda la lógica en `app/page.tsx`.
- Consumir Audius directamente desde cada componente.
- Duplicar tipos de Track/Artist en muchos archivos.
- Mezclar UI reusable con componentes de una sola pantalla.

---

## Resultado

Con esta estructura podrás:

- Lanzar rápido la fase sin login.
- Mantener orden al crecer.
- Incorporar auth y base de datos después sin refactor masivo.
