import z from 'zod';
import { Module, Store, schema, getConfig } from 'modelence/server';

const dbContactMessages = new Store('contactMessages', {
  schema: {
    name: schema.string(),
    email: schema.string(),
    subject: schema.string(),
    message: schema.string(),
    createdAt: schema.date(),
    read: schema.boolean(),
  },
  indexes: [
    { key: { createdAt: -1 } },
    { key: { read: 1 } }
  ]
});

export default new Module('contact', {
  configSchema: {
    email: {
      type: 'string',
      default: 'contact@ome-prod.bj',
      isPublic: true,
    },
    whatsappNumber: {
      type: 'string',
      default: '+22901451080064',
      isPublic: true,
    },
    phone: {
      type: 'string',
      default: '+229 01 45 10 80 64',
      isPublic: true,
    },
    address: {
      type: 'string',
      default: 'Cotonou, Calavi, Benin',
      isPublic: true,
    },
  },

  stores: [dbContactMessages],

  queries: {
    getContactInfo: async () => {
      return {
        email: getConfig('contact.email') as string,
        whatsappNumber: getConfig('contact.whatsappNumber') as string,
        phone: getConfig('contact.phone') as string,
        address: getConfig('contact.address') as string,
      };
    },
  },

  mutations: {
    submit: async (args: unknown) => {
      const { name, email, subject, message } = z.object({
        name: z.string().min(1, 'Le nom est requis'),
        email: z.string().email('Email invalide'),
        subject: z.string().min(1, 'L\'objet est requis'),
        message: z.string().min(1, 'Le message est requis'),
      }).parse(args);

      await dbContactMessages.insertOne({
        name,
        email,
        subject,
        message,
        createdAt: new Date(),
        read: false,
      });

      return { success: true };
    },
  },
});
