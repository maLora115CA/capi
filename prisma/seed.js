const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Admin User
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.adminUser.upsert({
    where: { email: 'admin@acompanam.com' },
    update: {},
    create: {
      email: 'admin@acompanam.com',
      passwordHash: adminPasswordHash,
      name: 'Admin Principal',
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // 2. Create Content Blocks
  const contentBlocksData = [
    { key: 'hero_badge', value: 'Servicio de Compañía Premium' },
    { key: 'hero_title_1', value: 'Más que cuidado,' },
    { key: 'hero_title_2', value: 'compañía.' },
    { key: 'hero_description', value: 'Brindamos apoyo humano, cálido y profesional para adultos mayores y personas con limitaciones físicas. Porque estar juntos hace la diferencia.' },
    { key: 'about_title', value: 'Entendemos el valor de estar presentes' },
    { key: 'about_description', value: 'En **Acompaña**, nos dedicamos a generar vínculos de confianza. Ofrecemos a tus seres queridos la atención y presencia cálida que necesitan en su día a día, permitiéndote tener la seguridad y paz mental de que están en buenas manos.' },
    { key: 'about_note', value: 'No brindamos servicios de enfermería médica; nos enfocamos exclusivamente en brindar compañía y apoyo humano integral.' },
    { key: 'services_subtitle', value: 'Nuestros Servicios' },
    { key: 'services_title', value: 'Planes de Compañía' },
    { key: 'services_description', value: 'Adaptados a tus necesidades y horarios con flexibilidad total para tu tranquilidad.' },
    { key: 'contact_whatsapp_number', value: '524430000000' }, // Solo números para links
  ];

  for (const block of contentBlocksData) {
    await prisma.contentBlock.upsert({
      where: { key: block.key },
      update: {},
      create: block,
    });
  }
  console.log('Created content blocks');

  // 3. Create Service Cards
  const servicesData = [
    {
      order: 0,
      title: 'Turno 4h',
      description: 'Ideal para acompañamiento y apoyo parcial por la mañana o la tarde.',
      features: ['Compañía activa', 'Paseos locales'],
      highlighted: false,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-brand-sage w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    },
    {
      order: 1,
      title: 'Turno 8h',
      description: 'Acompañamiento completo durante toda tu jornada de trabajo o salida extensa.',
      features: ['Asistencia a citas médicas', 'Apoyo en mandados'],
      highlighted: true,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-white w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'
    },
    {
      order: 2,
      title: 'Día Completo',
      description: 'Cobertura extendida desde la mañana hasta la noche. Mayor presencia.',
      features: ['Compañía continua', 'Actividades estimulantes'],
      highlighted: false,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-brand-sage w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
    },
    {
      order: 3,
      title: 'Turno Noche',
      description: 'Tranquilidad nocturna y atención inmediata ante cualquier necesidad.',
      features: ['Apoyo nocturno', 'Prevención de caídas'],
      highlighted: false,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-brand-sage w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>'
    }
  ];

  for (const service of servicesData) {
    const existingService = await prisma.serviceCard.findFirst({
      where: { title: service.title }
    });
    
    if (!existingService) {
      await prisma.serviceCard.create({
        data: service
      });
    }
  }
  console.log('Created service cards');

  console.log('Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
