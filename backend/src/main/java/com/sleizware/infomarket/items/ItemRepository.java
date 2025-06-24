package com.sleizware.infomarket.items;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByItemCategoryIgnoreCase(String itemCategory);
    List<Item> findAllByOrderByPostedDateDesc();
    List<Item> findBySellerPhone(String sellerPhone);
    List<Item> findRecentItemsByItemCategory(String itemCategory);

    void deleteItemByItemId(Long itemId);
}
