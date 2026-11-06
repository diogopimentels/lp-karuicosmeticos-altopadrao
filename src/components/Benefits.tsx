const benefits = [
  {
    title: "Conexão Emocional Profunda",
    description:
      "35% das nossas memórias e emoções são ativadas pelo olfato, criando um vínculo instantâneo e inesquecível com o cliente.",
  },
  {
    title: "Aumento Real nas Vendas",
    description:
      "Ambientes estrategicamente aromatizados quebram as barreiras racionais e elevam diretamente a taxa de conversão no ponto de venda.",
  },
  {
    title: "Permanência e Retenção",
    description:
      "Notas olfativas sofisticadas geram conforto e relaxamento, fazendo o cliente passar mais tempo e voltar sempre à sua loja.",
  },
  {
    title: "Branding e Desejo Imediato",
    description:
      "Sua marca ganha tridimensionalidade e autoridade, fixando-se na mente do consumidor e despertando o desejo imediato de compra.",
  },
] as const;

export function Benefits() {
  return (
    <section
      id="beneficios"
      className="border-t border-ivory/8 bg-charcoal px-6 py-24 md:px-10 lg:px-12"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="w-full">
          <h2 className="text-fill font-display text-3xl leading-snug tracking-[-0.02em] text-ivory md:text-4xl">
            O que o marketing olfativo pode fazer pela sua marca
          </h2>
          <p className="text-fill mt-4 text-base leading-relaxed text-muted">
            Uma presença aromática bem conduzida reforça a experiência no ponto
            de venda, fortalece a marca e aproxima o cliente da decisão de
            compra.
          </p>
        </div>

        <ul className="mt-16 grid w-full gap-x-12 gap-y-12 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <li
              key={benefit.title}
              className="w-full border-t border-gold/25 pt-7"
            >
              <p className="font-sans text-[0.68rem] tracking-[0.28em] text-gold uppercase">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-fill mt-4 font-display text-[1.55rem] leading-snug text-ivory md:text-[1.7rem]">
                {benefit.title}
              </h3>
              <p className="text-fill mt-3 text-[0.98rem] leading-relaxed text-muted">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16">
          <a
            href="#formulario"
            className="inline-flex items-center gap-3 text-[0.72rem] font-semibold tracking-[0.2em] text-gold uppercase transition-colors hover:text-ivory"
          >
            Falar com a Karuí
            <span aria-hidden className="text-base leading-none">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
