export function getPage(pageQuery?: string): number {
  let page = 1;

  if (pageQuery) {
    const parsed = Number(pageQuery);

    if (!isNaN(parsed)) {
      page = parsed;
    }
  }

  if (page < 1) {
    page = 1;
  }

  return page;
}
