package com.sleizware.infomarket.admins;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.sleizware.infomarket.items.Item;
import com.sleizware.infomarket.items.ItemRepository;
import com.sleizware.infomarket.sellers.Seller;
import com.sleizware.infomarket.sellers.SellerRepository;
import com.sleizware.infomarket.users.User;
import com.sleizware.infomarket.users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping(path = "/api/infomarket/v1")
public class AdminController {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SellerRepository sellerRepository;

    // ----------------- Admin Endpoints ------------------

    @GetMapping("/admin")
    public ResponseEntity<List<Admin>> getAllAdmins() {
        return new ResponseEntity<>(adminRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/admins/admin/{adminId}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long adminId) {
        return adminRepository.findByAdminId(adminId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping("/admin/create/new")
    public ResponseEntity<String> registerAdmin(@RequestBody Admin admin) {
        if (adminRepository.findByEmail(admin.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        adminRepository.save(admin);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Admin " + admin.getAdminName() + " created successfully!");
    }

    @PostMapping("/admin/auth")
    public ResponseEntity<Map<String, String>> loginAdmin(@RequestBody AdminLogin adminLogin) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(adminLogin.getEmail());
        if (adminOpt.isEmpty() || !adminOpt.get().getPassword().equals(adminLogin.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Invalid credentials"));
        }

        Admin admin = adminOpt.get();
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome back " + admin.getAdminName() + "!");
        response.put("name", admin.getAdminName());
        response.put("role", admin.getRole());

        return ResponseEntity.ok(response);
    }

    @PutMapping("/admin/update")
    public ResponseEntity<String> updateAdminDetails(@RequestBody Admin updatedData) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(updatedData.getEmail());
        if (adminOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Admin not found.");
        }

        Admin admin = adminOpt.get();
        admin.setAdminName(updatedData.getAdminName());
        admin.setPhone(updatedData.getPhone());
        admin.setRole(updatedData.getRole());
        admin.setPassword(updatedData.getPassword());
        admin.setProfilePicture(updatedData.getProfilePicture());

        adminRepository.save(admin);
        return ResponseEntity.ok("Admin details updated successfully.");
    }

    // ----------------- Admin Items Endpoints ------------------

    @GetMapping("/items/item/{itemId}")
    public ResponseEntity<Item> getItemById(@PathVariable Long itemId) {
        return itemRepository.findByItemId(itemId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/admin/items")
    public ResponseEntity<List<Item>> getAllItems() {
        List<Item> items = itemRepository.findAll();
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    @PostMapping(path = "/admin/items/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
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
            item.setItemName(itemName);
            item.setItem_price(itemPrice);
            item.setItemCategory(itemCategory);
            item.setItem_description(itemDescription);
            item.setSeller_name(sellerName);
            item.setSellerPhone(sellerPhone);
            item.setStatus("Available");

            itemRepository.save(item);
            return ResponseEntity.ok( itemName + " uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload " + itemName);
        }
    }

    @PutMapping("/admin/items/update/status/{itemId}")
    public ResponseEntity<String> updateItemStatus(@PathVariable Long itemId, @RequestParam String status) {
        Optional<Item> itemOpt = itemRepository.findByItemId(itemId);
        if (itemOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        }
        Item item = itemOpt.get();
        item.setStatus(status);
        itemRepository.save(item);
        return ResponseEntity.ok("Item status updated to " + status);
    }

    @DeleteMapping("/admin/items/delete/{itemId}")
    public ResponseEntity<String> deleteItem(@PathVariable Long itemId) {
        if (!itemRepository.existsById(itemId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Item not found.");
        }
        itemRepository.deleteById(itemId);
        return ResponseEntity.ok("Item deleted successfully.");
    }

    // ----------------- Admin Users Endpoints ------------------

    @GetMapping("/user")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/users/user/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        return userRepository.findByUserId(userId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @PostMapping("/admin/user/create")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        if (userRepository.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        userRepository.save(user);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully.");
    }

    @PutMapping("/admin/user/update/{userId}")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody User userData) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }

        User user = userOpt.get();
        user.setUsername(userData.getUsername());
        user.setPhone(userData.getPhone());
        user.setPassword(userData.getPassword());
        user.setUserClass(userData.getUserClass());
        user.setProfilePicture(userData.getProfilePicture());
        userRepository.save(user);

        return ResponseEntity.ok("User updated successfully.");
    }

    @DeleteMapping("/admin/user/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        if (!userRepository.existsById(userId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        userRepository.deleteById(userId);
        return ResponseEntity.ok("User deleted successfully.");
    }

    // ----------------- Admin Sellers Endpoints ------------------

    @GetMapping("/seller")
    public ResponseEntity<List<Seller>> getAllSellers() {
        return new ResponseEntity<>(sellerRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/sellers/seller/{sellerId}")
    public ResponseEntity<Seller> getSellerById(@PathVariable Long sellerId) {
        return sellerRepository.findBySellerId(sellerId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }


    @PostMapping("/admin/seller/create")
    public ResponseEntity<String> addSeller(@RequestBody Seller seller) {
        if (sellerRepository.findBySellerEmail(seller.getSellerEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }

        sellerRepository.save(seller);
        return ResponseEntity.status(HttpStatus.CREATED).body("Seller created successfully.");
    }

    @PutMapping("/admin/seller/update/{sellerId}")
    public ResponseEntity<String> updateSeller(@PathVariable Long sellerId, @RequestBody Seller sellerData) {
        Optional<Seller> sellerOpt = sellerRepository.findById(sellerId);
        if (sellerOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Seller not found.");
        }

        Seller seller = sellerOpt.get();
        seller.setSellerName(sellerData.getSellerName());
        seller.setSellerPhone(sellerData.getSellerPhone());
        seller.setProfilePicture(sellerData.getProfilePicture());
        seller.setPassword(sellerData.getPassword());
        seller.setDistribution(sellerData.getDistribution());
        sellerRepository.save(seller);

        return ResponseEntity.ok("Seller updated successfully.");
    }

    @DeleteMapping("/admin/seller/delete/{sellerId}")
    public ResponseEntity<String> deleteSeller(@PathVariable Long sellerId) {
        if (!sellerRepository.existsById(sellerId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Seller not found.");
        }
        sellerRepository.deleteById(sellerId);
        return ResponseEntity.ok("Seller deleted successfully.");
    }


    // ----------------- Admin Dashboard Endpoints ------------------

    @GetMapping("/admin/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long userCount = userRepository.count();
        long sellerCount = sellerRepository.count();
        long itemCount = itemRepository.count();

        // For sales, you'll need a Sales entity. We'll mock this for now:
        double totalSales = itemRepository.findAll().stream()
                .filter(item -> "Sold".equalsIgnoreCase(item.getStatus()))
                .mapToDouble(Item::getItem_price)
                .sum();

        stats.put("users", userCount);
        stats.put("sellers", sellerCount);
        stats.put("items", itemCount);
        stats.put("sales", totalSales);

        return ResponseEntity.ok(stats);
    }
}

