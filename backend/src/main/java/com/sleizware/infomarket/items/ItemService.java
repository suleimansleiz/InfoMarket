package com.sleizware.infomarket.items;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ItemService {
    @Autowired
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> allItems() {
        return itemRepository.findAll();
    }

//    public String storeUploadedItems(@RequestBody ItemRequest request) {
//
//    }

}
