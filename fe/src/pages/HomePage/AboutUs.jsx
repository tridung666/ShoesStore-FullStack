import React from 'react'
import {
  FaShoePrints,
  FaStar,
  FaHeadset,
  FaGift,
  FaTruck,
  FaChartLine,
} from 'react-icons/fa'
import { Link } from 'react-router-dom'

const AboutUs = ({
  bannerImg,          // Ảnh banner hoặc sản phẩm giày
  logoImg,            // Logo cửa hàng
  onOrderClick,       // Xử lý khi nhấn nút đặt hàng
  orderLink = '/Adidas',    // Link mặc định nút đặt hàng
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
    { icon: <FaShoePrints />, title: "ĐA DẠNG MẪU MÃ", desc: "phù hợp mọi phong cách" },
    { icon: <FaStar />, title: "CHẤT LƯỢNG CAO", desc: "đảm bảo chính hãng" },
    { icon: <FaHeadset />, title: "HỖ TRỢ 24/7", desc: "luôn đồng hành cùng bạn" },
    { icon: <FaGift />, title: "ƯU ĐÃI ĐẶC BIỆT", desc: "cho thành viên thân thiết" },
    { icon: <FaTruck />, title: "GIAO HÀNG NHANH", desc: "trong vòng 24h" },
    { icon: <FaChartLine />, title: "CẢI TIẾN LIÊN TỤC", desc: "đáp ứng nhu cầu mới" },
  ],
}) => {
  return (
    <div className="flex flex-col my-8 items-center relative rounded-xl bg-gray-200">
      {/* Section: Tiêu đề chính */}
      <section className="w-full text-center bg-primary h-[250px] flex flex-col justify-center items-center space-y-4 text-white">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </section>

      {/* Section: Nội dung chia đôi */}
      <section className="flex flex-col md:flex-row w-full md:w-4/5 bg-gray-100 relative -mt-16 shadow-lg rounded overflow-hidden">
        {/* Cột trái: nội dung */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="font-semibold font-serif text-2xl mb-3">{companyName}</h2>
          <hr className="border-primary mb-6 w-1/3 border-2" />
          <p className="text-gray-800 text-lg">{introText}</p>
          <p className="mt-6 text-sm text-gray-700">{description1}</p>
          <h3 className="text-center my-6 font-serif italic text-primary text-xl">{quote}</h3>
          <p className="text-sm text-gray-700">{description2}</p>
          <hr className="border-primary my-6 w-1/3 border-2" />
          <p className="font-semibold font-serif text-primary text-lg">{companyName}</p>
        </div>

        {/* Cột phải: hình ảnh */}
        <div className="w-full md:w-1/2 h-80 md:h-auto">
          {bannerImg ? (
            <img
              src={bannerImg}
              alt="Sản phẩm giày"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
              Ảnh chưa được cung cấp
            </div>
          )}
        </div>
      </section>

      {/* Section: Why Choose Us */}
      <section className="w-full px-8 py-12 flex flex-col items-center space-y-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center w-full">
          {/* Cột trái: hình ảnh logo */}
          <div className="relative w-full h-[220px] flex items-center">
            {/* Khối màu xám bên trái */}
            <div className="w-[60%] h-full bg-gray-300 rounded-l-lg"></div>

            {/* Logo chồng lên khối xám */}
            <div className="absolute left-[55%] w-[200px] h-[150px] bg-white shadow-md rounded-lg flex items-center justify-center overflow-hidden">
              {logoImg ? (
                <img
                  src={logoImg}
                  alt="Logo cửa hàng"
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-500">Chưa có logo</div>
              )}
            </div>
          </div>

          {/* Cột phải: lý do chọn chúng tôi */}
          <div>
            <div className="flex items-center justify-center w-full gap-6 my-6">
              <div className="w-20 border-t-4 border-primary"></div>
              <h3 className="text-2xl font-bold text-center whitespace-nowrap text-primary">
                {chooseUsTitle}
              </h3>
              <div className="w-20 border-t-4 border-primary"></div>
            </div>

            <p className="text-base text-gray-600 mb-8 text-center md:text-left">
              {chooseUsSubtitle}
            </p>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6 text-sm text-gray-700">
              {features.map(({ icon, title, desc }, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="text-primary text-2xl">{icon}</div>
                  <div>
                    <p className="font-bold text-primary">{title}</p>
                    <p className="text-xs text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ORDER NOW button */}
        <div>
          <Link
            to={orderLink}
            onClick={onOrderClick}
            className="bg-primary hover:bg-primary-dark text-white px-10 py-4 font-semibold rounded-md transition"
          >
            ĐẶT HÀNG NGAY
          </Link>
        </div>
      </section>
    </div>
  )
}

export default AboutUs
