package com.sleizware.infomarket.users;

import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findUserByEmail(String sellerEmail);

    Optional<User> findByUserId(Long userId);
}
