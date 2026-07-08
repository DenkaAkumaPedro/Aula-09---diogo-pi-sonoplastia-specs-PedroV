import { defineCollection, z } from 'astro:content';

const artistaCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    role: z.string().optional(),
    slug: z.string().optional(),
    section: z.string().optional(),
    order: z.number().optional(),
    heroEyebrow: z.string().optional(),
    heroTitle: z.string().optional(),
    heroDescription: z.string().optional(),
    heroCta: z.string().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    aboutEyebrow: z.string().optional(),
    aboutTitle: z.string().optional(),
    aboutImage: z.string().optional(),
    aboutImageAlt: z.string().optional(),
    contacts: z.object({
      phone: z.string().optional(),
      email: z.string().optional(),
      soundcloud: z.string().optional(),
    }).optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    audioFile: z.string().optional(),
    albumArt: z.string().optional(),
    artist: z.string().optional(),
  }),
});

const equipeCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    age: z.string().optional(),
    role: z.string(),
    image: z.string(),
    order: z.number(),
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    description: z.string().optional(),
    title: z.string().optional(),
  }),
});

const fichaTecnicaCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    order: z.number().optional(),
  }),
});

const galeriaCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    eyebrow: z.string().optional(),
    heading: z.string().optional(),
    description: z.string().optional(),
    order: z.number().optional(),
  }),
});

const paginasCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string().optional(),
    updated: z.string().optional(),
    robots: z.string().optional(),
  }),
});

const footerCollection = defineCollection({
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = {
  artista: artistaCollection,
  equipe: equipeCollection,
  'ficha-tecnica': fichaTecnicaCollection,
  galeria: galeriaCollection,
  paginas: paginasCollection,
  footer: footerCollection,
};
