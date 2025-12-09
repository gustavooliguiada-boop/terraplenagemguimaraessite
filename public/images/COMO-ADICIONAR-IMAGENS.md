# Como Adicionar Imagens das Máquinas

## Estrutura de Pastas

As imagens devem ser colocadas na pasta `/public/images/` seguindo a estrutura abaixo:

```
/public/images/
├── escavadeiras/
│   ├── hyundai-140.png
│   ├── komatsu-pc130.png
│   ├── hyundai-220.png
│   ├── komatsu-pc200.png
│   ├── sany-135c.png
│   ├── sany-215c.png
│   ├── sany-215h.png
│   └── cat-320.png
├── carregadeiras/
│   ├── case-w20e.png
│   ├── case-w20g.png
│   ├── nw-12d.png
│   └── hyundai-635-al.png
├── motoniveladoras/
│   ├── new-holland-rg170.png
│   ├── case-865b.png
│   ├── komatsu-gd655.png
│   ├── cat-140.png
│   └── john-deere-620g.png
├── retro-escavadeiras/
├── rolos-compactadores/
│   ├── dynapac-ca250.png
│   ├── dynapac-ca150.png
│   ├── xcmg-xs120pd.png
│   ├── cat-cs10g.png
│   ├── cat-cs533.png
│   ├── jcb-vm115.png
│   └── sany-ssrd120-pd.png
├── tratores-esteira/
│   ├── komatsu-d61.png
│   ├── cat-d5.png
│   ├── cat-d6.png
│   └── john-deere-750j.png
└── tratores-agricolas/
```

## Passo a Passo

### 1. Adicionar as Imagens na Pasta Correta

1. Coloque as fotos dos seus equipamentos nas pastas correspondentes
2. Use nomes descritivos e em minúsculas (ex: `hyundai-140.jpg`)
3. Formatos aceitos: `.jpg`, `.jpeg`, `.png`, `.webp`

### 2. Ativar as Imagens no Código

#### Para Modelos de Máquinas (ex: Escavadeiras)

Edite o arquivo `/src/pages/MachineDetails.tsx`:

```typescript
{
  name: "Hyundai 140",
  slug: "hyundai-140",
  image: "/images/escavadeiras/hyundai-140.jpg", // Descomente e ajuste o caminho
}
```

**Remova o `//` antes de `image:` para ativar a imagem.**

#### Para Especificações dos Modelos

Edite o arquivo `/src/pages/ModelSpecifications.tsx`:

```typescript
"hyundai-140": {
  name: "Hyundai 140",
  machineType: "Escavadeira",
  image: "/images/escavadeiras/hyundai-140.jpg", // Descomente e ajuste o caminho
  specifications: [
    // ...
  ],
}
```

**Remova o `//` antes de `image:` para ativar a imagem.**

## Exemplo Completo

### Antes (sem imagem):
```typescript
{
  name: "Hyundai 140",
  slug: "hyundai-140",
  // image: "/images/escavadeiras/hyundai-140.jpg",
}
```

### Depois (com imagem):
```typescript
{
  name: "Hyundai 140",
  slug: "hyundai-140",
  image: "/images/escavadeiras/hyundai-140.jpg",
}
```

## Dicas

- Use imagens com boa qualidade e resolução mínima de 800x600px
- Mantenha um padrão de proporção (recomendado 4:3)
- Comprima as imagens para melhorar o tempo de carregamento
- Use nomes de arquivo sem espaços ou caracteres especiais

## Adicionar Novos Modelos

Para adicionar um novo modelo de máquina:

1. Adicione a imagem na pasta correta
2. Adicione o modelo no array em `MachineDetails.tsx`
3. Adicione as especificações em `ModelSpecifications.tsx`

Exemplo:
```typescript
// Em MachineDetails.tsx
{
  name: "Caterpillar 320",
  slug: "caterpillar-320",
  image: "/images/escavadeiras/caterpillar-320.jpg",
}

// Em ModelSpecifications.tsx
"caterpillar-320": {
  name: "Caterpillar 320",
  machineType: "Escavadeira",
  image: "/images/escavadeiras/caterpillar-320.jpg",
  specifications: [
    { label: "Peso Operacional", value: "20.000 kg" },
    { label: "Potência do Motor", value: "145 HP" },
    // ... mais especificações
  ],
}
```
