import * as motion from "framer-motion/client";
import { CustomCursor, Navbar, MagneticButton, Counter, Typewriter, TiltCard, AnimatedLine, ParallaxImage } from "@/components/ui/InteractiveComponents";

export default function Home() {

  // Contenido estático del sitio
  const t = (key: string, fallback: string) => fallback;
  
  const serviceCards = [
    {
      id: 1,
      title: 'Turno 4h',
      description: 'Ideal para acompañamiento y apoyo parcial por la mañana o la tarde.',
      features: ['Compañía activa', 'Paseos locales'],
      highlighted: false,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-brand-sage w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    },
    {
      id: 2,
      title: 'Turno 8h',
      description: 'Acompañamiento completo durante toda tu jornada de trabajo o salida extensa.',
      features: ['Asistencia a citas médicas', 'Apoyo en mandados'],
      highlighted: true,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-white w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>'
    },
    {
      id: 3,
      title: 'Día Completo',
      description: 'Cobertura extendida desde la mañana hasta la noche. Mayor presencia.',
      features: ['Compañía continua', 'Actividades estimulantes'],
      highlighted: false,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-brand-sage w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
    },
    {
      id: 4,
      title: 'Turno Noche',
      description: 'Tranquilidad nocturna y atención inmediata ante cualquier necesidad.',
      features: ['Apoyo nocturno', 'Prevención de caídas'],
      highlighted: false,
      iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" class="text-brand-sage w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>'
    }
  ];

  const heroBadge = t('hero_badge', 'Servicio de Compañía Premium');
  const heroTitle1 = t('hero_title_1', 'Más que cuidado,');
  const heroDesc = t('hero_description', 'Brindamos apoyo humano, cálido y profesional para adultos mayores y personas con limitaciones físicas. Porque estar juntos hace la diferencia.');
  const aboutTitle = t('about_title', 'Entendemos el valor de estar presentes');
  const aboutDesc = t('about_description', 'En Acompaña, nos dedicamos a generar vínculos de confianza. Ofrecemos a tus seres queridos la atención cálida que necesitan en su día a día.');
  const aboutNote = t('about_note', 'No brindamos servicios de enfermería médica; nos enfocamos exclusivamente en brindar compañía y apoyo humano integral.');
  const servicesSubtitle = t('services_subtitle', 'Nuestros Servicios');
  const servicesTitle = t('services_title', 'Planes de Compañía');
  const servicesDesc = t('services_description', 'Adaptados a tus necesidades y horarios con flexibilidad total para tu tranquilidad.');
  const whatsappNumber = t('contact_whatsapp_number', '524430000000');
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  // Constantes de animación global
  const staggerContainer: any = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };
  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.3, 1] } }
  };

  return (
    <>
      <CustomCursor />
      <Navbar whatsappUrl={whatsappUrl} />

      {/* Floating WhatsApp Button */}
      <div className="fixed bottom-8 right-8 z-50 group-hover-tooltip group">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#25D366] animate-halo-ring pointer-events-none"></div>
          <MagneticButton 
            href={whatsappUrl} 
            className="rounded-full bg-[#25D366] text-white p-5 shadow-lg relative z-10 hover:shadow-xl"
            aria-label="Contactar por WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
            </svg>
          </MagneticButton>
          <div className="tooltip opacity-0 transform translate-y-4 transition-all duration-300 absolute right-[120%] top-1/2 -translate-y-1/2 bg-[var(--color-brand-charcoal)] text-white text-[12px] font-medium px-4 py-2 rounded-full whitespace-nowrap pointer-events-none">
            Escríbenos ahora
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-32 pb-24 z-10">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="text-left z-10 mt-16 md:mt-0"
          >
            <motion.div variants={fadeUp} className="inline-block py-2 px-6 rounded-full bg-white/60 backdrop-blur-md border border-white text-[var(--color-brand-charcoal)] text-[12px] font-medium tracking-widest uppercase mb-10 shadow-sm">
              {heroBadge}
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-[56px] md:text-[72px] lg:text-[96px] text-[var(--color-brand-charcoal)] leading-[1.05] mb-8 tracking-tighter">
              <span className="font-thin block">{heroTitle1}</span>
              <span className="font-light flex gap-3 items-center">
                <Typewriter words={["compañía.", "calidez.", "presencia."]} />
              </span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-[20px] text-[var(--color-brand-charcoal)]/80 mb-12 max-w-xl font-light leading-relaxed">
              {heroDesc}
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <MagneticButton href={whatsappUrl} className="bg-[var(--color-brand-charcoal)] text-white text-[16px] px-10 py-5 rounded-full font-light shadow-lg">
                Contactar Asesor
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: [0.25, 1, 0.3, 1], delay: 0.2 }}
            className="relative hidden lg:block h-[75vh] w-full"
          >
            <div className="absolute inset-0 rounded-[24px] overflow-hidden shadow-lg bg-brand-charcoal">
              <img 
                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Compañía cálida" 
                className="w-full h-full object-cover object-center opacity-90 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-brand-sage)]/20 to-transparent mix-blend-overlay"></div>
            </div>
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute -left-12 bottom-24 bg-white/90 backdrop-blur-md p-6 rounded-[24px] max-w-[280px] shadow-lg border border-white"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-brand-sage)]/10 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-2 border-[var(--color-brand-sage)] rounded-full animate-ping opacity-20"></div>
                  <div className="w-2.5 h-2.5 bg-[var(--color-brand-sage)] rounded-full"></div>
                </div>
                <div>
                  <p className="text-[16px] font-medium text-[var(--color-brand-charcoal)]">Atención Premium</p>
                  <p className="text-[12px] text-[var(--color-brand-charcoal)]/60 font-medium tracking-widest uppercase mt-1">Servicio Activo</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* About Section */}
      <section className="py-32 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="relative h-[650px] rounded-[24px] overflow-hidden shadow-sm group"
          >
            <ParallaxImage 
              src="https://images.unsplash.com/photo-1516880711640-ef7daf816e87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Manos entrelazadas" 
              className="w-full h-full"
            />
            <div className="absolute inset-0 bg-[var(--color-brand-sage)]/0 group-hover:bg-[var(--color-brand-sage)]/20 transition-colors duration-500 mix-blend-multiply"></div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-left"
          >
            <motion.h2 variants={fadeUp} className="text-[40px] md:text-[56px] font-thin mb-8 text-[var(--color-brand-charcoal)] tracking-tight leading-tight">
              {aboutTitle}
            </motion.h2>
            
            <AnimatedLine />
            
            <motion.p variants={fadeUp} className="text-[20px] text-[var(--color-brand-charcoal)]/80 leading-relaxed font-light mb-16">
              {aboutDesc}
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-8 mb-16 border-t border-[var(--color-brand-charcoal)]/10 pt-12">
              <Counter to={50} label="Familias" />
              <Counter to={4} label="Años Exp." />
              <div className="flex flex-col items-start">
                <span className="text-[32px] font-light text-[var(--color-brand-charcoal)] leading-none mb-1 flex items-center h-[32px]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[var(--color-brand-sage)]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <span className="text-[12px] font-medium tracking-widest uppercase text-[var(--color-brand-charcoal)]/60">
                  Morelia
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="border-l-[3px] border-[var(--color-brand-sage)] pl-6 py-2">
              <p className="text-[16px] font-light text-[var(--color-brand-charcoal)]/70">
                <strong className="font-medium text-[var(--color-brand-charcoal)]">Nota Editorial:</strong> {aboutNote}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid section */}
      <section className="py-32 relative z-10 bg-grid-pattern bg-[var(--color-brand-cream)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-24"
          >
            <motion.span variants={fadeUp} className="text-[var(--color-brand-sage)] font-medium tracking-[0.2em] uppercase text-[12px] mb-4 block">
              {servicesSubtitle}
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-[48px] md:text-[72px] font-thin text-[var(--color-brand-charcoal)] mb-8 tracking-tighter">
              {servicesTitle}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[20px] text-[var(--color-brand-charcoal)]/75 max-w-2xl mx-auto font-light">
              {servicesDesc}
            </motion.p>
          </motion.div>

          {serviceCards.length > 0 && (
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {serviceCards.map((service) => (
                <TiltCard key={service.id}>
                  <motion.div
                    variants={fadeUp}
                    className={`h-full ${service.highlighted ? "conic-border-wrapper" : ""}`}
                  >
                    <div className={`h-full p-8 flex flex-col ${service.highlighted ? "conic-border-inner text-white" : "bg-white rounded-[24px] shadow-sm border border-[var(--color-brand-charcoal)]/5"}`}>
                      
                      <div className="mb-8 flex justify-between items-start">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center ${service.highlighted ? "bg-white/10" : "bg-[var(--color-brand-sage)]/10"}`}
                          dangerouslySetInnerHTML={{ __html: service.iconSvg }}
                        />
                        {service.highlighted && (
                          <span className="bg-[var(--color-brand-sage)] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm">
                            Popular
                          </span>
                        )}
                      </div>

                      <h3 className="text-[32px] font-light mb-4">{service.title}</h3>
                      <p className={`${service.highlighted ? "text-white/85" : "text-[var(--color-brand-charcoal)]/75"} mb-10 text-[16px] flex-grow font-light leading-relaxed`}>
                        {service.description}
                      </p>
                      
                      <ul className="space-y-4 border-t border-current/10 pt-6">
                        {service.features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-center gap-3 text-[16px] font-light">
                            <div className={`w-1.5 h-1.5 rounded-full ${service.highlighted ? "bg-white" : "bg-[var(--color-brand-sage)]"}`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </TiltCard>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer / Final CTA */}
      <footer className="relative z-10 bg-[var(--color-brand-charcoal)] overflow-hidden">
        {/* Background Image para el Footer */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Fondo compañía" 
            className="w-full h-full object-cover opacity-10 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-charcoal)] via-[var(--color-brand-charcoal)]/80 to-transparent"></div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center text-center relative z-10 pt-48 pb-20"
        >
          <motion.h2 variants={fadeUp} className="text-[56px] md:text-[72px] font-thin mb-16 text-[var(--color-brand-cream)] tracking-tighter max-w-4xl leading-tight text-shadow-sm">
            ¿Listo para darles la mejor <br/><span className="italic text-[var(--color-brand-sage)] font-light">compañía</span>?
          </motion.h2>

          <motion.div variants={fadeUp}>
            <MagneticButton 
              href={whatsappUrl} 
              className="bg-[var(--color-brand-sage)] text-white text-[20px] px-16 py-6 rounded-full font-light transition-all duration-500 mb-32 shadow-glow hover:shadow-[0_0_60px_rgba(107,122,101,0.6)]"
            >
              Hablemos por WhatsApp
            </MagneticButton>
          </motion.div>

          <motion.div variants={fadeUp} className="w-full flex flex-col md:flex-row justify-between items-center text-white/50 text-[16px] font-light gap-6 border-t border-white/10 pt-10">
            <span>Morelia, Michoacán</span>
            <span className="font-medium">Acompaña &copy; 2026.</span>
            <span>(443) 000 0000</span>
          </motion.div>
        </motion.div>
      </footer>
    </>
  );
}
