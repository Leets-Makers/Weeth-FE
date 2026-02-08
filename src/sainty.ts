// eslint-disable-next-line import/no-extraneous-dependencies
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'tn0j01pf',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-20',
});

// 가장 최근 활성 팝업 1개를 가져오는 함수
export async function getActivePopups() {
  const query = `*[_type == "popup" && isActive == true && now() >= startDate && now() <= endDate] | order(startDate desc)[0] {
    headerLabel,
    pages[] {
      title,
      content,
      "imageUrl": image.asset->url,
      linkUrl,
      useDefaultImage
    }
  }`;

  return client.fetch(query, {}, { useCdn: false });
}
