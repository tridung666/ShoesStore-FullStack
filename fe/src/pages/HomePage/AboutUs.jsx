import React from 'react'
import {
  FaShoePrints,
  FaStar,
  FaHeadset,
  FaGift,
  FaTruck,
  FaChartLine,
} from 'react-icons/fa'
import logo from '../../assets/J97.png'
import { Link } from 'react-router-dom'

const AboutUs = ({
  bannerImg = 'https://graphicsfamily.com/wp-content/uploads/edd/2021/07/Free-Sports-Running-Shoes-Banner-Design-2048x1152.jpg',
  logoImg = logo,
  onOrderClick,
  orderLink = '/Adidas',
  title = "Về Chúng Tôi",
  subtitle = "Chất lượng và phong cách đỉnh cao cho từng bước chân.",
  companyName = "J97 Store",
  introText = "Giày không chỉ là phụ kiện, đó là phong cách sống.",
  description1 = "Chúng tôi mang đến cho bạn bộ sưu tập giày đa dạng từ các thương hiệu hàng đầu, với chất lượng đảm bảo và thiết kế thời thượng.",
  quote = "'Bước chân tự tin - Phong cách nổi bật'",
  description2 = "Với sự kết hợp hoàn hảo giữa công nghệ và sự tinh tế, mỗi đôi giày tại J97 Store đều giúp bạn thoải mái suốt ngày dài và tự tin tỏa sáng.",
  chooseUsTitle = "TẠI SAO CHỌN J97 STORE",
  chooseUsSubtitle = "Chúng tôi cam kết mang đến trải nghiệm mua sắm giày hoàn hảo nhất.",
  features = [
    { icon: <FaShoePrints />, title: "ĐA DẠNG MẪU MÃ", desc: "Phù hợp mọi phong cách" },
    { icon: <FaStar />, title: "CHẤT LƯỢNG CAO", desc: "Đảm bảo chính hãng" },
    { icon: <FaHeadset />, title: "HỖ TRỢ 24/7", desc: "Luôn đồng hành cùng bạn" },
    { icon: <FaGift />, title: "ƯU ĐÃI ĐẶC BIỆT", desc: "Cho thành viên thân thiết" },
    { icon: <FaTruck />, title: "GIAO HÀNG NHANH", desc: "Trong vòng 24h" },
    { icon: <FaChartLine />, title: "CẢI TIẾN LIÊN TỤC", desc: "Đáp ứng nhu cầu mới" },
  ],
}) => {
  return (
    <div className="bg-secondary min-h-screen my-4 py-16 px-6 md:px-16">
      {/* Header */}
      <header className="text-center mb-16 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-primary mb-2 drop-shadow-md">{title}</h1>
        <p className="text-lg text-primary/90 font-medium tracking-wide">{subtitle}</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row gap-12 max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Left Content */}
        <section className="md:w-1/2 p-10 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl font-semibold text-primary mb-4">{companyName}</h2>
          <hr className="w-20 border-primary border-4 rounded-full mb-6" />
          <p className="text-gray-700 text-lg leading-relaxed">{introText}</p>
          <p className="text-gray-600">{description1}</p>
          <blockquote className="italic text-primary text-xl font-serif text-center mt-8 mb-8 border-l-4 border-primary pl-6 shadow-sm">
            {quote}
          </blockquote>
          <p className="text-gray-600">{description2}</p>
          <hr className="w-20 border-primary border-4 rounded-full mt-10" />
          <p className="font-bold text-primary text-lg mt-6">{companyName}</p>
        </section>

        {/* Right Banner */}
        <section className="md:w-1/2 relative">
          {bannerImg ? (
            <img
              src={bannerImg}
              alt="Sản phẩm giày"
              className="object-cover w-full h-full max-h-[480px] rounded-bl-3xl rounded-tr-3xl shadow-lg"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-80 bg-gray-200 rounded-bl-3xl rounded-tr-3xl text-gray-400 font-semibold">
              Ảnh chưa được cung cấp
            </div>
          )}
        </section>
      </main>

      {/* Why Choose Us */}
      <section className="max-w-6xl mx-auto mt-20 px-4 md:px-0">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
          {/* Logo */}
          <div className="relative w-full md:w-1/3 flex justify-center md:justify-start">
            <div className="w-3/4 h-56 bg-secondary rounded-l-3xl shadow-lg"></div>
            <div className="absolute left-1/3 w-44 h-44 bg-white rounded-3xl shadow-xl flex items-center justify-center overflow-hidden -translate-x-1/2 -translate-y-1/4">
              {logoImg ? (
                <img
                  src={logoImg}
                  alt="Logo cửa hàng"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span className="text-primary font-semibold">Chưa có logo</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="md:w-2/3 space-y-6">
            <div className="flex items-center justify-center md:justify-start gap-6 mb-6">
              <div className="w-16 border-t-4 border-primary rounded"></div>
              <h3 className="text-3xl font-extrabold text-primary">{chooseUsTitle}</h3>
              <div className="w-16 border-t-4 border-primary rounded"></div>
            </div>
            <p className="text-primary text-lg mb-8">{chooseUsSubtitle}</p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-primary">
              {features.map(({ icon, title, desc }, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 bg-secondary rounded-lg shadow hover:shadow-lg transition"
                >
                  <div className="text-primary text-3xl">{icon}</div>
                  <div>
                    <h4 className="font-bold text-primary">{title}</h4>
                    <p className="text-sm text-primary/80 mt-1">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Button */}
            <div className="mt-10 flex justify-center md:justify-start">
              <Link
                to={orderLink}
                onClick={onOrderClick}
                className="inline-block bg-primary hover:bg-accent text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg transition"
              >
                ĐẶT HÀNG NGAY
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs;
