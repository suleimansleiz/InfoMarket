package com.sleizware.infomarket.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PurchaseIntentRepository extends JpaRepository<PurchaseIntent, Long> {
    Optional<PurchaseIntent> findByOrderReference(String orderReference);
}

