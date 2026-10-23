# Tchily Flowers — site

Site one-page (só frontend) da Tchily Flowers, florista em Luanda. Vite + React + TypeScript, animações com Motion e scroll suave com Lenis.

## Correr

```bash
npm install
npm run dev      # abre em http://localhost:5173
npm run build    # gera a pasta dist/ para publicar
```

Para publicar (ex.: Hostinger), basta enviar o conteúdo de `dist/` para a pasta do site.

## Onde mudar o conteúdo

- `src/data/site.ts`: todos os textos, serviços, produtos, preços, flores, missão, testemunhos e contactos.
  - `site.whatsapp.number`: quando houver o número (formato `244XXXXXXXXX`), cada botão abre o WhatsApp já com a mensagem certa.
  - Tudo o que está marcado com `MOCK` é simulado e tem de ser confirmado com o cliente.
- `src/data/images.ts`: as fotos. Para acrescentar uma, pôr o ficheiro em `public/images/` e adicionar uma entrada; a galeria e a fita de imagens usam-na sozinhas.

## Sobre as fotos

As fotos vêm do Instagram público da marca e são pequenas (330–640px). O design foi feito para nunca as esticar. Com as fotos originais do cliente, dá para usar imagens maiores.

`PROMPT.md` tem a especificação completa do design.
