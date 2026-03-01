# La Academia de los Cuatro Reinos - Documentación de Diseño

## 1. Resumen del Proyecto

**Título:** La Academia de los Cuatro Reinos
**Tipo:** Juego educativo móvil / Web App
**Público objetivo:** Estudiantes de educación elemental superior y educación media temprana (9-12 años)
**Idioma:** Español
**Objetivo:** Practicar operaciones aritméticas (suma, resta, multiplicación, división) mientras se integran explicaciones narrativas breves sobre sistemas numéricos históricos (romano, maya, decimal)

---

## 2. Estructura de Niveles

### Nivel 1: Reino de la Energía (Adición)
- **Icono:** ⚡
- **Color primario:** #ef4444 (Rojo fuego)
- **Operación:** Suma
- **Dificultad:** Suma de 2 dígitos con acarreo
- **Problemas:** 10 problemas con dificultad progresiva
- **Sistema histórico:** Sistema Numérico Romano (sistema no posicional)

### Nivel 2: Reino de la Defensa (Sustracción)
- **Icono:** 🛡️
- **Color primario:** #3b82f6 (Azul acero)
- **Operación:** Resta
- **Dificultad:** Resta de 3 dígitos con préstamo
- **Problemas:** 10 problemas con dificultad progresiva
- **Sistema histórico:** Sistema Numérico Maya (base 20, puntos y barras)

### Nivel 3: Reino de la Construcción (Multiplicación)
- **Icono:** 🔨
- **Color primario:** #10b981 (Verde tierra)
- **Operación:** Multiplicación
- **Dificultad:** Tablas del 1-12, 2 dígitos × 1 dígito
- **Problemas:** 10 problemas con dificultad progresiva
- **Sistema histórico:** Sistema Numérico Decimal (sistema posicional)

### Nivel 4: Reino de la Distribución (División)
- **Icono:** ⚖️
- **Color primario:** #8b5cf6 (Púrpura mágica)
- **Operación:** División
- **Dificultad:** División sin restos (inicialmente), restos simples
- **Problemas:** 10 problemas con dificultad progresiva
- **Sistema histórico:** Comparación de sistemas numéricos

### Jefe Final: Torre del Tiempo
- **Formato:** 20 preguntas mixtas
- **Restricción:** 120 segundos totales
- **Condición de fallo:** El tiempo se agota O 0 vidas

---

## 3. Wireframes de Pantallas

### Pantalla 1: Bienvenida (Welcome Screen)

```
┌─────────────────────────────────┐
│                                 │
│         🏰                      │
│                                 │
│   LA ACADEMIA DE LOS            │
│   CUATRO REINOS                 │
│                                 │
│  ┌─────────────────────────┐   │
│  │  ⚔️ ¡Bienvenido,       │   │
│  │     Aprendiz! ⚔️        │   │
│  │                         │   │
│  │  ¿Cómo te llamas?      │   │
│  │  ┌─────────────────┐    │   │
│  │  │ [Input de texto]│    │   │
│  │  └─────────────────┘    │   │
│  │                         │   │
│  │  Elige tu avatar        │   │
│  │  🧙 🧝 🧛 🧚 🦸 🦹 🐉  │   │
│  │                         │   │
│  │  ┌─────────────────┐    │   │
│  │  │ ¡COMENZAR      │    │   │
│  │  │ AVENTURA!      │    │   │
│  │  └─────────────────┘    │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Elementos:**
- Título con tipografía serif (Cinzel)
- Campo de entrada de texto para nombre del jugador
- Selector de avatar (grid de 8 iconos)
- Botón grande de llamada a la acción
- Fondo degradado fantasy

---

### Pantalla 2: Mapa de Reinos (Map Screen)

```
┌─────────────────────────────────┐
│  🧙 NombreJugador    1,250 pts │
│  ┌─────────────────────────┐   │
│  │ ❤️❤️❤️                  │   │
│  └─────────────────────────┘   │
│                                 │
│      🗺️ MAPA DE LOS           │
│         REINOS                  │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ⚡ Reino de la Energía  │   │
│  │    Adición         ⭐  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🛡️ Reino de la Defensa │   │
│  │    Sustracción     🔒  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 🔨 Reino de la          │   │
│  │    Construcción    🔒  │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ ⚖️ Reino de la          │   │
│  │    Distribución   🔒   │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │ 👑 Torre del Tiempo 🔒 │   │
│  │    JEFE FINAL           │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Elementos:**
- Header con avatar, nombre y puntuación
- Título del mapa
- Tarjetas de nivel con:
  - Icono del reino
  - Nombre del reino
  - Operación matemática
  - Indicador de completado ⭐ o candado 🔒
- Card de jefe final (bloqueado hasta completar 4 niveles)

---

### Pantalla 3: Juego de Nivel (Level Screen)

```
┌─────────────────────────────────┐
│  ⚡ Reino de la Energía  ❤️❤️❤️ │
│  ┌─────────────────────────┐   │
│  │ ████████░░░░░░  3/10   │   │
│  └─────────────────────────┘   │
│                                 │
│         1,250 pts              │
│         🔥 Racha: 5            │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │       25 + 37 = ?       │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌───────────┐ ┌───────────┐   │
│  │    60     │ │    62     │   │
│  └───────────┘ └───────────┘   │
│                                 │
│  ┌───────────┐ ┌───────────┐   │
│  │    61     │ │    63     │   │
│  └───────────┘ └───────────┘   │
│                                 │
│  🛡️  ❤️  ⭐  ⏱️               │
│  50💎 80💎 40💎 60💎           │
│  x3   x2   x5   x3            │
│                                 │
│  💎 Maná: 120                   │
└─────────────────────────────────┘
```

**Elementos:**
- Header: Icono del reino, nombre, vidas (corazones)
- Barra de progreso (3/10)
- Puntuación y racha actual
- Tarjeta de pregunta grande y legible
- Grid de 4 opciones de respuesta
- Barra de habilidades (4 botones):
  - Escudo Místico (ignora 1 error)
  - Recarga Vital (recupera 1 corazón)
  - Doble Puntos (x2 por 3 preguntas)
  - Tiempo Extra (+5 segundos en jefe)
- Indicador de maná disponible

---

### Pantalla 4: Sala del Conocimiento (Knowledge Room)

```
┌─────────────────────────────────┐
│           📜                    │
│                                 │
│    SALA DEL CONOCIMIENTO       │
│                                 │
│    Reino de la Energía          │
│                                 │
│  ┌─────────────────────────┐   │
│  │  Sistema Numérico       │   │
│  │  Romano                 │   │
│  │                         │   │
│  │  Los romanos usaban un  │   │
│  │  sistema de numeración  │   │
│  │  no posicional con     │   │
│  │  letras: I (1), V (5), │   │
│  │  X (10), L (50),       │   │
│  │  C (100), D (500)...   │   │
│  │                         │   │
│  │  ¡No tenían cero!      │   │
│  └─────────────────────────┘   │
│                                 │
│  Pregunta 1 de 2               │
│                                 │
│  ┌─────────────────────────┐   │
│  │  ¿Qué valor tiene X?   │   │
│  │                         │   │
│  │  ○ 1    ○ 5            │   │
│  │  ● 10   ○ 50           │   │
│  └─────────────────────────┘   │
│                                 │
└─────────────────────────────────┘
```

**Elementos:**
- Estilo de pergamino antiguo
- Título del sistema numérico histórico
- Texto explicativo (máx. 120 palabras)
- Indicador de progreso de mini-pruebas
- 2 preguntas interactivas con opciones
- Retroalimentación inmediata

---

### Pantalla 5: Jefe Final (Boss Screen)

```
┌─────────────────────────────────┐
│  👑 TORRE DEL TIEMPO    ❤️❤️❤️ │
│  ┌─────────────────────────┐   │
│  │     ⏱️ 1:45             │   │
│  │  ████████████░░░  15/20│   │
│  └─────────────────────────┘   │
│                                 │
│         3,500 pts              │
│         🔥 Racha: 8            │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │     45 + 28 = ?         │   │
│  │                         │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌───────────┐ ┌───────────┐   │
│  │    70     │ │    73     │   │
│  └───────────┘ └───────────┘   │
│                                 │
│  ┌───────────┐ ┌───────────┐   │
│  │    72     │ │    75     │   │
│  └───────────┘ └───────────┘   │
│                                 │
│  ⏸️ TIEMPO CONGELADO          │
│                                 │
│  🛡️  ❤️  ⭐  ⏱️               │
│  x2   x1   x3   x1            │
│                                 │
└─────────────────────────────────┘
```

**Elementos:**
- Tema oscuro (rojo/púrpura)
- Temporizador grande y visible (rojo cuando <30s)
- 20 preguntas mixtas
- Indicador de "TIEMPO CONGELADO" cuando se usa habilidad
- Todas las habilidades disponibles

---

### Pantalla 6: Game Over

```
┌─────────────────────────────────┐
│                                 │
│           💀                   │
│                                 │
│      ¡HAS PERDIDO!             │
│                                 │
│  Te has quedado sin vidas       │
│                                 │
│  ┌─────────────────────────┐   │
│  │    Puntuación          │   │
│  │      1,250             │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │    🔄 REINTENTAR        │   │
│  └─────────────────────────┘   │
│                                 │
│  ┌─────────────────────────┐   │
│  │    🏠 VOLVER AL MENÚ  │   │
│  └─────────────────────────┘   │
│                                 │
│   ¡No te rindas!               │
│   La práctica lleva            │
│   a la maestría.               │
│                                 │
└─────────────────────────────────┘
```

**Elementos:**
- Icono de muerte/fracaso
- Mensaje de game over
- Puntuación final
- Botón de reintentar
- Botón de volver al menú
- Mensaje de ánimo

---

## 4. Diagrama de Flujo

```
                    ┌─────────────────────┐
                    │   PANTALLA DE       │
                    │   BIENVENIDA        │
                    │   (Welcome)         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      MAPA DE        │
                    │      REINOS         │
                    │      (Map)          │
                    └──────────┬──────────┘
                               │
            ┌──────────────────┼──────────────────┐
            │                  │                  │
            ▼                  ▼                  ▼
   ┌─────────────────┐ ┌─────────────┐ ┌──────────────────┐
   │  NIVEL 1        │ │  NIVEL 2    │ │  ... -> JEFE     │
   │  Energía (+)    │ │  Defensa(-) │ │  FINAL (Boss)    │
   └────────┬────────┘ └──────┬──────┘ └────────┬─────────┘
            │                 │                   │
            ▼                 ▼                   │
   ┌─────────────────┐ ┌─────────────┐           │
   │  PREGUNTAS     │ │  PREGUNTAS  │           │
   │  (10 problems)  │ │ (10 problems)           │
   └────────┬────────┘ └──────┬──────┘           │
            │                 │                   │
       ┌────┴────┐       ┌────┴────┐              │
       │         │       │         │              │
       ▼         ▼       ▼         ▼              │
   ┌─────────┐ ┌─────────┐ ┌─────────┐          │
   │CORRECTO │ │INCORR. │ │ GAME    │          │
   │         │ │ -1 vida │ │ OVER    │◄─────────┘
   └────┬────┘ └────┬────┘ └─────────┘
        │           │
        │    ┌──────┴──────┐
        │    │             │
        │    ▼             ▼
        │  ┌──────────────┐
        │  │SALAS DEL     │
        │  │CONOCIMIENTO  │
        │  │(Knowledge)   │
        │  └──────┬───────┘
        │         │
        │         ▼
        │  ┌──────────────┐
        │  │MINI-PRUEBAS  │
        │  │(2 preguntas) │
        │  └──────┬───────┘
        │         │
        │    ┌────┴────┐
        │    │         │
        │    ▼         ▼
        │  ┌────┐  ┌────┐
        │  │ ✓  │  │ ✗  │
        │  └────┘  └────┘
        │    │      │
        └────┼──────┘
             │
             ▼
      ┌──────────────────┐
      │   SIGUIENTE      │
      │   NIVEL          │
      │   DESBLOQUEADO   │
      └────────┬─────────┘
               │
               ▼
      ┌──────────────────┐
      │   REGRESAR AL   │
      │   MAPA          │
      └──────────────────┘
```

---

## 5. Lógica de Puntuación

### Sistema de Puntuación Base

```javascript
// Puntuación base por respuesta correcta
const CORRECT_ANSWER = 100;  // puntos

// Bonificación por racha (streak)
const STREAK_BONUS = 10;     // puntos por cada pregunta correcta consecutivos
const STREAK_MAX = 50;       // máximo de bonificación por racha

// Puntuación del jefe final
const BOSS_TIME_BONUS = 5;           // puntos por segundo restante
const BOSS_COMPLETE_BONUS = 1000;     // bonificación por completar
const LIVES_BONUS = 200;             // puntos por vida restante

// Cálculo de puntuación
function calculateScore(isCorrect, streakCount, isBoss = false, timeLeft = 0, livesRemaining = 0) {
  let score = 0;

  if (isCorrect) {
    // Puntuación base
    score += CORRECT_ANSWER;

    // Bonificación de racha
    const streakBonus = Math.min(streakCount * STREAK_BONUS, STREAK_MAX);
    score += streakBonus;
  }

  // Bonificaciones del jefe (al completar)
  if (isBoss && timeLeft > 0) {
    score += timeLeft * BOSS_TIME_BONUS;
    score += BOSS_COMPLETE_BONUS;
    score += livesRemaining * LIVES_BONUS;
  }

  return score;
}
```

### Sistema de Maná

```javascript
// Ganancia de maná
const MANA_PER_CORRECT = 10;    // Maná ganado por respuesta correcta
const MANA_LEVEL_COMPLETE = 50; // Maná ganado al completar un nivel

// Habilidades
const ABILITIES = {
  shield: { cost: 50, maxUses: 3 },      // Escudo Místico
  recharge: { cost: 80, maxUses: 2 },   // Recarga Vital
  multiplier: { cost: 40, maxUses: 5 },  // Doble Puntos
  extratime: { cost: 60, maxUses: 3 }    // Tiempo Extra
};
```

---

## 6. Ejemplo de Problemas por Nivel

### Nivel 1: Adición (Reino de la Energía)

| # | Problema | Respuesta | Opciones |
|---|----------|-----------|----------|
| 1 | 15 + 23 = ? | 38 | [35, 38, 42, 40] |
| 2 | 27 + 34 = ? | 61 | [58, 61, 64, 59] |
| 3 | 45 + 28 = ? | 73 | [70, 73, 75, 68] |
| 4 | 56 + 37 = ? | 93 | [90, 93, 95, 88] |
| 5 | 68 + 45 = ? | 113 | [110, 113, 115, 108] |
| 6 | 129 + 84 = ? | 213 | [210, 213, 215, 208] |
| 7 | 247 + 158 = ? | 405 | [400, 402, 405, 395] |
| 8 | 356 + 279 = ? | 635 | [630, 632, 635, 625] |
| 9 | 478 + 346 = ? | 824 | [820, 822, 824, 815] |
| 10 | 589 + 467 = ? | 1056 | [1050, 1052, 1056, 1045] |

### Nivel 2: Sustracción (Reino de la Defensa)

| # | Problema | Respuesta | Opciones |
|---|----------|-----------|----------|
| 1 | 45 - 23 = ? | 22 | [20, 22, 25, 18] |
| 2 | 78 - 34 = ? | 44 | [42, 44, 46, 40] |
| 3 | 93 - 47 = ? | 46 | [44, 46, 48, 42] |
| 4 | 125 - 68 = ? | 57 | [55, 57, 59, 53] |
| 5 | 204 - 89 = ? | 115 | [112, 115, 118, 110] |
| 6 | 347 - 159 = ? | 188 | [185, 188, 190, 182] |
| 7 | 500 - 234 = ? | 266 | [264, 266, 268, 260] |
| 8 | 712 - 378 = ? | 334 | [330, 332, 334, 328] |
| 9 | 856 - 429 = ? | 427 | [425, 427, 429, 420] |
| 10 | 1000 - 567 = ? | 433 | [430, 432, 433, 435] |

### Nivel 3: Multiplicación (Reino de la Construcción)

| # | Problema | Respuesta | Opciones |
|---|----------|-----------|----------|
| 1 | 7 × 6 = ? | 42 | [40, 42, 45, 36] |
| 2 | 8 × 9 = ? | 72 | [68, 70, 72, 64] |
| 3 | 12 × 7 = ? | 84 | [80, 82, 84, 78] |
| 4 | 15 × 8 = ? | 120 | [115, 118, 120, 110] |
| 5 | 23 × 4 = ? | 92 | [88, 90, 92, 86] |
| 6 | 34 × 3 = ? | 102 | [98, 100, 102, 96] |
| 7 | 45 × 6 = ? | 270 | [265, 268, 270, 260] |
| 8 | 78 × 5 = ? | 390 | [385, 388, 390, 380] |
| 9 | 56 × 7 = ? | 392 | [385, 388, 392, 378] |
| 10 | 89 × 9 = ? | 801 | [795, 798, 801, 790] |

### Nivel 4: División (Reino de la Distribución)

| # | Problema | Respuesta | Opciones |
|---|----------|-----------|----------|
| 1 | 48 ÷ 6 = ? | 8 | [6, 7, 8, 9] |
| 2 | 63 ÷ 9 = ? | 7 | [6, 7, 8, 9] |
| 3 | 84 ÷ 7 = ? | 12 | [10, 11, 12, 13] |
| 4 | 96 ÷ 8 = ? | 12 | [10, 11, 12, 14] |
| 5 | 144 ÷ 12 = ? | 12 | [10, 11, 12, 13] |
| 6 | 156 ÷ 13 = ? | 12 | [10, 11, 12, 14] |
| 7 | 198 ÷ 11 = ? | 18 | [16, 17, 18, 19] |
| 8 | 224 ÷ 14 = ? | 16 | [14, 15, 16, 17] |
| 9 | 288 ÷ 12 = ? | 24 | [22, 23, 24, 25] |
| 10 | 384 ÷ 16 = ? | 24 | [22, 23, 24, 26] |

### Jefe Final: 20 Problemas Mixtos

1. 25 + 17 = 42
2. 93 - 48 = 45
3. 8 × 7 = 56
4. 72 ÷ 8 = 9
5. 34 + 29 = 63
6. 156 - 78 = 78
7. 9 × 9 = 81
8. 64 ÷ 8 = 8
9. 47 + 38 = 85
10. 100 - 56 = 44
11. 12 × 6 = 72
12. 96 ÷ 12 = 8
13. 56 + 47 = 103
14. 234 - 167 = 67
15. 15 × 5 = 75
16. 108 ÷ 9 = 12
17. 89 + 76 = 165
18. 300 - 145 = 155
19. 24 × 4 = 96
20. 144 ÷ 12 = 12

---

## 7. Especificaciones de Diseño

### Paleta de Colores

| Elemento | Color | Hex |
|----------|-------|-----|
| Reino Energía | Rojo fuego | #ef4444 |
| Reino Defensa | Azul acero | #3b82f6 |
| Reino Construcción | Verde tierra | #10b981 |
| Reino Distribución | Púrpura mágica | #8b5cf6 |
| Fondo neutro | Pergamino | #fffbeb |
| Texto neutro | Tinta oscura | #3f2e3e |
| Acentos | Ámbar | #f59e0b |
| Jefe Final | Rojo oscuro | #991b1b |

### Tipografía

- **Títulos:** Cinzel (serif, fantasy)
- **Números:** Fredoka (redondeado, amigable)
- **Cuerpo:** Nunito (legibilidad alta)

### Componentes UI

- **Botones grandes:** Mínimo 48x48px para touch
- **Espaciado generoso:** 16px mínimo entre elementos
- **Sombras:** Suavizadas para profundidad
- **Radio de bordes:** 12-16px para apariencia amigable
- **Animaciones:** Transiciones suaves de 200-300ms

---

## 8. Especificaciones Técnicas

### Requisitos del Proyecto

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Estilos:** Tailwind CSS
- **Persistencia:** localStorage
- **Responsive:** Mobile-first (375px - 768px)
- **PWA:** Instalable en dispositivos móviles

### Estructura de Archivos

```
src/
├── components/
│   └── GameComponents.tsx    # Componentes reutilizables
├── context/
│   └── GameContext.tsx      # Estado global del juego
├── data/
│   └── gameData.ts          # Problemas y configuración
├── screens/
│   ├── WelcomeScreen.tsx    # Pantalla de bienvenida
│   ├── MapScreen.tsx        # Mapa de reinos
│   ├── LevelScreen.tsx      # Juego de nivel
│   ├── KnowledgeRoom.tsx    # Sala del conocimiento
│   ├── BossScreen.tsx       # Jefe final
│   └── GameOverScreen.tsx  # Pantalla de juego terminado
├── App.tsx                  # Componente principal
└── index.css                # Estilos globales
```

---

*Documento de Diseño - La Academia de los Cuatro Reinos*
*Versión 1.0 - Proyecto de Prototipo*
