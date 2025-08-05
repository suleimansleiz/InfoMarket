package com.sleizware.infomarket.items;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByItemCategoryIgnoreCase(String itemCategory);
    List<Item> findAllByOrderByPostedDateDesc();
    List<Item> findBySellerPhone(String sellerPhone);
    List<Item> findRecentItemsByItemCategory(String itemCategory);
    Optional<Item> findByItemId(Long itemId);
    void deleteItemByItemId(Long itemId);

    @Modifying
    @Transactional
    @Query("UPDATE Item i SET i.status = 'Sold' WHERE i.itemName = :itemName")
    void updateItemStatusToSold(@Param("itemName") String itemName);
}
