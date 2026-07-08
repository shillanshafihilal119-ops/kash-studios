# The Great Minds

An MVP for an AI-powered intellectual theatre where historical thinkers discuss a user's philosophical question with visible citations.

## Current Workflow

1. Open the homepage.
2. Enter one philosophical question.
3. Begin the debate.
4. The debate stage loads through `/api/debate`.
5. Speeches and citations render in the stage UI.

## Debate Providers

The app defaults to the mock provider so local development works without secrets.

Copy `.env.example` to `.env.local` and use:

```env
DEBATE_PROVIDER=mock
```

To use OpenAI:

```env
DEBATE_PROVIDER=openai
OPENAI_API_KEY=your_key_here
OPENAI_MODEL=gpt-5.5
```

The OpenAI provider uses structured JSON output and then validates the result before the UI receives it.

## Validation Rules

Generated debates must:

- start and end with the moderator
- include Socrates, Plato, Aristotle, Nietzsche, and Rumi
- include direct replies between thinkers
- include citations for every non-moderator speech
- include suggested reading
- include historical notes for citations

These checks are intentionally conservative because historical integrity matters more than theatrical speed.

## Commands

```powershell
& 'C:\Program Files\nodejs\npm.cmd' run dev
& 'C:\Program Files\nodejs\npm.cmd' run typecheck
& 'C:\Program Files\nodejs\npm.cmd' run lint
& 'C:\Program Files\nodejs\npm.cmd' run build
```
