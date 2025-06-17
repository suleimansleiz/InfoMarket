package com.sleizware.infomarket.items;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.sleizware.infomarket.sellers.Seller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/infomarket/v1/items")
public class ItemController {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemRepository.findAll();
        Collections.shuffle(items);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/{sellerPhone}")
    public ResponseEntity<List<Item>> getItemsBySellerPhone(@PathVariable String sellerPhone) {
        List<Item> items = itemRepository.findBySellerPhone(sellerPhone);

        if (items.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Item>> getItemsByCategory(@PathVariable String category) {
        List<Item> items = itemRepository.findByItemCategoryIgnoreCase(category);

        if (items.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @GetMapping("/recent")
    public ResponseEntity<List<Item>> getItemsSortedByDate() {
        List<Item> items = itemRepository.findAllByOrderByPostedDateDesc();

        if (items.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadItem(
            @RequestParam("item_photo") MultipartFile file,
            @RequestParam("item_name") String itemName,
            @RequestParam("item_price") Double itemPrice,
            @RequestParam("item_category") String itemCategory,
            @RequestParam("item_description") String itemDescription,
            @RequestParam("seller_name") String sellerName,
            @RequestParam("seller_phone") String sellerPhone) {

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = (String) uploadResult.get("secure_url");

            Item item = new Item();
            item.setItem_photo(imageUrl);
            item.setItem_name(itemName);
            item.setItem_price(itemPrice);
            item.setItemCategory(itemCategory);
            item.setItem_description(itemDescription);
            item.setSeller_name(sellerName);
            item.setSellerPhone(sellerPhone);

            itemRepository.save(item);
            return ResponseEntity.ok("Congrats, you uploaded " + itemName + " successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Oops!...Uploading " + itemName + " failed!");
        }
    }
}


