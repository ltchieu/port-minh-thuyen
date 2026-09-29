import { ExperienceItem } from '../types/experiences';
import { projectsData } from './projects';

export const experiencesData: ExperienceItem[] = [
  {
    id: "exp-mt-digital",
    company: "MT DIGITAL AGENCY",
    role: "Content Marketing & Video Production",
    period: "2024 — 2025",
    location: "TP. Hồ Chí Minh",
    logo: "/projects/MT_Digital/Quoc_phong_hair_salon/logo.svg",
    description: "Phụ trách triển khai chiến lược Content Marketing & Video Production cho nhiều nhóm ngành (Hair & Beauty, Luxury & Interior, Real Estate), từ nghiên cứu thị trường, xây dựng định hướng nội dung (Content Direction) đến trực tiếp sản xuất video ngắn, tối ưu tương tác Social Media đạt hàng trăm nghìn lượt xem.",
    badgeColor: "pink",
    projects: projectsData.filter(
      (p) =>
        p.agency === 'MT DIGITAL AGENCY' ||
        p.id.startsWith('proj-quoc-phong') ||
        p.id.startsWith('proj-savax') ||
        p.id.startsWith('proj-tt-genesis')
    ),
  },
  {
    id: "exp-othk-education",
    company: "OTHK EDUCATION",
    role: "Content Marketing Freelancer & Community Builder",
    period: "2024",
    location: "TP. Hồ Chí Minh",
    logo: "/projects/OTHK EDUCATION/logo.svg",
    description: "Phụ trách xây dựng nội dung Social Media và phát triển cộng đồng sinh viên, sáng lập & vận hành nhóm Facebook 'Góc học tập UEH' từ 0 cán mốc 10.7K+ thành viên, sáng tạo tuyến content viral tiếp cận 25K+ sinh viên/bài, đồng thời đạt danh hiệu Best Builder 3 tháng liên tiếp và dẫn đầu doanh số toàn hệ thống.",
    badgeColor: "tiffany",
    projects: projectsData.filter(
      (p) => p.agency === 'OTHK EDUCATION' || p.id.startsWith('proj-othk')
    ),
  },
  {
    id: "exp-family-bean-coffee",
    company: "THE FAMILY BEAN COFFEE",
    role: "Content Marketing Freelancer & Video Production",
    period: "2024",
    location: "Bình Thạnh, TP. Hồ Chí Minh",
    logo: "/projects/THE FAMILY BEAN COFFEE/logo.svg",
    description: "Phụ trách nghiên cứu insight khách hàng sinh viên & freelancer, xây dựng kế hoạch Content Calendar đa kênh (Facebook, TikTok), lên ý tưởng và quay dựng chuỗi video ngắn viral đạt kỷ lục 39.8K views, đồng thời hỗ trợ triển khai các chương trình khuyến mãi (CTKM 10K, Phiếu tích điểm) gia tăng doanh số thực tế.",
    badgeColor: "orange",
    projects: projectsData.filter(
      (p) =>
        p.agency === 'THE FAMILY BEAN COFFEE' ||
        p.id.startsWith('proj-the-family-bean')
    ),
  },
  {
    id: "exp-pisago-music-art",
    company: "PISAGO MUSIC & ART",
    role: "Content Marketing Freelancer & Video Production",
    period: "2024",
    location: "TP. Hồ Chí Minh",
    logo: "/projects/PISAGO MUSIC AND ART/logo.svg",
    description: "Phụ trách nghiên cứu tâm lý phụ huynh, xây dựng định vị thương hiệu 'Cây Âm Nhạc Cá Nhân Hoá', thiết lập gói phễu trải nghiệm 0đ kết hợp chính sách ưu đãi combo gia đình, sản xuất chuỗi 5 video ngắn chạm cảm xúc và hỗ trợ tổ chức các buổi Workshop trải nghiệm thực tế cuối tuần thúc đẩy tỷ lệ chuyển đổi học viên bền vững.",
    badgeColor: "green",
    projects: projectsData.filter(
      (p) => p.agency === 'PISAGO MUSIC & ART' || p.id.startsWith('proj-pisago')
    ),
  },
  {
    id: "exp-steed",
    company: "STEED",
    role: "Content Marketing Freelancer & Video Production",
    period: "2024",
    location: "TP. Hồ Chí Minh",
    logo: "/projects/STEED/logo.svg",
    description: "Phụ trách nghiên cứu insight gymer, phân tích SWOT và đối thủ để xác lập USP cốt lõi: 'Mặc vào nhìn đô hơn ngay cả khi chưa có body - Thứ bạn bán là sự tự tin, không phải cái áo'. Lên kế hoạch kịch bản chi tiết, trực tiếp quay dựng và hoàn thiện trọn bộ 7 video ngắn thực chiến chuẩn 9:16 trên TikTok và Facebook Reels.",
    badgeColor: "pink",
    projects: projectsData.filter(
      (p) =>
        p.agency === 'STEED' ||
        p.client?.toLowerCase().includes('steed') ||
        p.id.startsWith('proj-steed')
    ),
  },
  {
    id: "exp-pmus-awards",
    company: "PMUS AWARDS",
    role: "Marketing Intern",
    period: "2023 — 2024",
    location: "TP. Hồ Chí Minh",
    description: "Hỗ trợ các hoạt động Marketing, sản xuất nội dung và triển khai truyền thông cho chương trình/sự kiện.",
    badgeColor: "tiffany",
    projects: [],
  }
];

