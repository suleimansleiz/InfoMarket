package com.sleizware.infomarket.sellers;

import aj.org.objectweb.asm.commons.Remapper;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SellerRepository extends JpaRepository<Seller, Long> {
    Optional<Seller> findBySellerEmail(String sellerEmail);

    Optional<Seller> findBySellerId(Long sellerId);

}

