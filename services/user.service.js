class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async getUser(userId) {
    const user = await this.userRepository.getUserById(userId);
    // 여기서 추가적인 비즈니스 로직을 수행
    return user;
  }
}
