import { routes } from '@navigator/routes';

export default {
  _nav: {
    tab0: 'Trang chủ',
    tab1: 'Sản phẩm',
    tab2: 'Khuyến mãi',
    tab3: 'Khách hàng',
    [routes.qr]: 'Mã QR',
    [routes.productDetail]: 'Tạo sản phẩm mới',
    [routes.promoDetail]: 'Tạo khuyến mãi mới',
    [routes.customerDetail]: 'Lịch sử khách hàng',
    [routes.pushNotification]: 'Tạo thông báo',
    [routes.postRedeem]: 'Tạo chương trình đổi điểm',
  },
  alert: {
    alert: 'Thông báo',
    warning: 'Cảnh báo',
    success: 'Thành công',
    unsuccess: 'Không thành công',
    confirm: 'Xác nhận',
    cancel: 'Huỷ bỏ',
    reject: 'Từ chối',
    ok: 'Đồng ý',
    error: 'Có lỗi xảy ra',
    protectTransaction: 'Giao dịch đã được mã hoá an toàn',
  },
  updateVerTitle: 'Cập nhật phiên bản',
  failure: 'Có lỗi xảy ra',
  errorFetching: 'Tải dữ liệu thất bại, thử lại ?',
  cannotOpenURL: 'Không thể mở đường dẫn {{url}}, vui lòng thử lại',
  cannotMakeCall:
    'Không thể thực hiện cuộc gọi tới số {{phone}}, vui lòng thử lại',
  cannotMailToCall: 'Không thể gửi email tới {{email}}, vui lòng thử lại',
  back: 'Quay lại',
  done: 'Xong',
  send: 'Gửi',
  updateNow: 'Cập nhật ngay',
  backToHome: 'Trang chủ',
  update: 'Cập nhật',
  callTo: 'Gọi: ',
  mailTo: 'Email: ',
  createProduct: 'Tạo sản phẩm',
  createRedeem: 'Tạo chương trình',
  createPromo: 'Tạo khuyến mãi',
  unsuccessfulProcess: 'Quy trình chưa hoàn tất, bạn chắc chắn muốn huỷ?',
  ok: 'Đồng ý',
  reject: 'Từ chối',
  error: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu',
  enterAddress: 'Nhập địa chỉ website',
  emptyContent: 'Không tìm thấy nội dung',
  title: 'Tiêu đề',
  content: 'Nội dung',
  at: 'Vào lúc',
  capture: 'Chụp ảnh',
  library: 'Chọn từ thư viện',
  permissionUnavailable:
    '"{{permission}}" không khả dụng, vui lòng thử lại sau.',
  requestPermissionTitle: 'Quyền truy cập?',
  requestPermissionMessage:
    'Vui lòng đồng ý quyền  truy cập "{{permission}}" để sử dụng tính năng này.',
  cameraPermission: 'Máy ảnh',
  libraryPermission: 'Thư viện ảnh',
  phUsername: 'Số điện thoại hoặc email',
  password: 'Mật khẩu',
  changePassword: 'Đổi mật khẩu',
  rePassword: 'Nhập lại mật khẩu',
  login: 'Đăng nhập',
  support: 'Hỗ trợ',
  register: 'Đăng ký',
  registerNow: 'Đăng ký ngay',
  forgotPsw: 'Quên mật khẩu',
  confirmOtp: 'Xác nhận OTP',
  confirmRegister: 'Xác nhận đăng ký',
  vdRequiredField: '{{field}} không được bỏ trống',
  vdPswNotMatch: 'Mật khẩu không trùng khớp',
  vdRequestCheckPrivacy: 'Vui lòng đồng ý điều khoản sử dụng',
  vdPswLength: 'Mật khẩu tối thiểu 6 ký tự',
  vdOtpLength: 'OTP có 6 ký tự',
  privacy1: 'Tôi đã đọc và đồng ý với các',
  privacy2: 'Quy định bảo mật',
  and: 'và',
  privacy3: 'Thoả thuận sử dụng',
  privacy4: 'của Babaza',
  unAuthorization: 'Tài khoản hoặc mật khẩu không đúng',
  usernameInvalid: 'Tài khoản không đúng định dạng',
  userNotExists: '{{username}} không tồn tại trên hệ thống',
  userExists: '{{username}} đã tồn tại trên hệ thống',
  phoneNotExists: 'Số điện thoại không tồn tại',
  phoneExists: 'Số điện thoại đã tồn tại',
  emailNotExists: 'Email không tồn tại',
  resendOtp: 'Gửi lại OTP',
  otpSent: 'Một mã OTP đã được gửi tới {{username}}',
  otpNotMatch: 'OTP không trùng khớp',
  cannotSendOtp: 'Không thể gửi OTP tới {{username}}, vui lòng kiểm tra lại',
  otpEmailFailure:
    'Xác nhận email thất bại vui lòng liên hệ bộ phận tư vấn để được hỗ trợ. Xin cảm ơn !!',
  otpPhoneFailure:
    'Xác nhận số điện thoại thất bại vui lòng liên hệ bộ phận tư vấn để được hỗ trợ. Xin cảm ơn !!',
  registerSuccess: 'Đăng ký tài khoản thành công',
  recoverSuccess: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại để tiếp tục',
  postProduct: 'Đăng sản phẩm',
  postPromotion: 'Đăng khuyến mãi',
  postRedeem: 'Tạo chương trình đổi điểm',
  pushNotification: 'Tạo thông báo đến khách hàng',
  statisticalShop: 'Thống kê cửa hàng',
  productName: 'Tên sản phẩm',
  promoName: 'Tên khuyến mãi',
  productCode: 'Mã sản phẩm',
  promoCode: 'Mã khuyến mãi',
  promoPrice: 'Giá khuyến mãi',
  promoPrePrice: 'Giá trước khuyến mãi',
  startDate: 'Thời gian bắt đầu',
  endDate: 'Thời gian kết thúc',
  branch: 'Chi nhánh',
  productAmount: 'Giá sản phẩm',
  unit: 'Đơn vị tính',
  description: 'Mô tả',
  point: 'Số điểm',
  image: 'Hình ảnh',
  redeemName: 'Tên chương trình tặng quà',
  redeemPoints: 'Điểm dùng để đổi',
  quantity: 'Số lượng',
  selectImage: 'Chọn hình ảnh',
  uploadImage: 'Tải lên hình ảnh',
  customerList: 'Khách hàng',
  manageOrders: 'Đơn hàng',
  labelPush: 'Tiêu đề thông báo',
  labelPushContent: 'Nội dung thông báo',
  labelPushNote:
    'Khi bạn nhấn gửi, thông báo của bạn sẽ được admin của Babaza sẽ duyệt thông tin, nếu hợp lệ khách hàng của bạn sẽ được thông báo với tiêu đề và nội dung này.',
  requestPushSuccess:
    'Yêu cầu thông báo tới khách hàng của bạn đã được Babaza ghi nhận, sau khi kiểm duyệt thông tin chúng tôi sẽ thông báo kết quả cho bạn.',
  requestPushFailure:
    'Yêu cầu thông báo tới khách hàng thất bại, vui lòng thử lại',
  vdContentMinLength: 'Nội dung ít nhất phải có {{length}} ký tự',
  vdTitleMinLength: 'Tiêu đề ít nhất phải có {{length}} ký tự',
  updateProductSuccess: 'Cập nhật thông tin sản phẩm thành công',
  createProductSuccess: 'Tạo thông tin sản phẩm thành công',
  createRedeemSuccess: 'Tạo chương trình quà tặng thành công',
  updatePromoSuccess: 'Cập nhật thông tin khuyến mãi thành công',
  createPromoSuccess: 'Tạo thông tin khuyến mãi thành công',
  vdInvalidDate:
    'Thời gian không hợp lệ, ngày kết thúc phải sau ngày bắt đầu ít nhất 1 ngày',
};