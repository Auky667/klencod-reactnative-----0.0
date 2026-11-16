/** تذييل التطبيق بالنصوص الأصلية */
export function AppFooter() {
  return (
    <footer className="mt-10 border-t border-hairline bg-surface/40">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="rounded-2xl islamic-pattern hairline bg-surface-2/70 p-5 text-center">
          <p className="display-font text-xl font-bold gold-text">ترميم الإسلام</p>
          <p className="mx-auto mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted">
            موسوعة تُقرّب العلم النافع وتجمع بين السيرة والعقيدة والقرآن والفقه في عرضٍ عربيٍّ رصين.
          </p>
          <p className="display-font mt-4 text-[15px] text-gold">
            اللهم صلِّ وسلم وبارك على نبينا محمد ﷺ
          </p>
        </div>
        <p className="mt-5 text-center text-[12px] text-muted">
          © 2026 ترميم الإسلام. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
