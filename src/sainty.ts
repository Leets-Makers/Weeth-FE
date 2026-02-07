import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'tn0j01pf',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-20',
});

// 활성 팝업 목록을 가져오는 함수
export async function getActivePopups() {
  const query = `*[_type == "popup" && isActive == true && now() >= startDate && now() <= endDate] | order(startDate desc) {
    title,
    content,
    "imageUrl": image.asset->url,
    linkUrl,
    useDefaultImage
  }`;

  return client.fetch(query);
}
