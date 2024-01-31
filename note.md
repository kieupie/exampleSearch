# Đặt vấn đề?
Khi tìm kiếm với từ khóa là "Ben", Network tab:
- Thực hiện 3 request API khác nhau
- Ta chỉ quan tâm đến kết quả cuối cùng với từ khóa là "Ben", việc call API cho từng ký tự nhập từ bàn phím đang lãng phí tài nguyên.

=> Cần sử dụng kỹ thuật Debounce 
# sử dụng setTimeout



## Kỹ thuật Throttle
Tương tự như debounce đảm bảo trong cùng một khoảng thời gian quy định, thì function chỉ thực thi một lần duy nhất.
TH thường sử dụng: scroll, read text editor (gõ văn bản - autosave)

Thời điểm callback được thực thi khác so với debounce 
- Với debounce: Nếu set delay time 1000ms~1s, sau 1s mà user không nhập search bar nữa thì mới thực thi event handler.
- Với Throttle: Nếu set wait time 1000ms~1s, thực thi ngay lập tức, rồi sau đó cứ 1s trôi qua nó lại thực thi lại event handler.