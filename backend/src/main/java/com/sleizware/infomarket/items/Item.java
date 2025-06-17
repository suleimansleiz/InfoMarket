package com.sleizware.infomarket.items;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "items")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long item_id;
    private String item_photo;
    private String item_name;
    private Double item_price;

    @Column(name = "item_category")
    private String itemCategory;
    private String item_description;
    private String seller_name;

    @Column(name = "seller_phone")
    private String sellerPhone;

    @Column(name = "posted_date", nullable = false, updatable = false)
    private LocalDate postedDate;

    @PrePersist
    protected void onCreate() {
        this.postedDate = LocalDate.now();
    }

    public Item() {
    }


    public Long getItem_id() {
        return item_id;
    }

    public void setItem_id(Long item_id) {
        this.item_id = item_id;
    }

    public String getItem_photo() {
        return item_photo;
    }

    public void setItem_photo(String item_photo) {
        this.item_photo = item_photo;
    }

    public String getItem_name() {
        return item_name;
    }

    public void setItem_name(String item_name) {
        this.item_name = item_name;
    }

    public Double getItem_price() {
        return item_price;
    }

    public void setItem_price(Double item_price) {
        this.item_price = item_price;
    }

    public String getItemCategory() {
        return itemCategory;
    }

    public void setItemCategory(String itemCategory) {
        this.itemCategory = itemCategory;
    }

    public String getItem_description() {
        return item_description;
    }

    public void setItem_description(String item_description) {
        this.item_description = item_description;
    }

    public String getSeller_name() {
        return seller_name;
    }

    public void setSeller_name(String seller_name) {
        this.seller_name = seller_name;
    }

    public String getSellerPhone() {
        return sellerPhone;
    }

    public void setSellerPhone(String sellerPhone) {
        this.sellerPhone = sellerPhone;
    }

    public LocalDate getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDate postedDate) {
        this.postedDate = postedDate;
    }

    @Override
    public String toString() {
        return "Item{" +
                "item_id=" + item_id +
                ", item_photo='" + item_photo + '\'' +
                ", item_name='" + item_name + '\'' +
                ", item_price=" + item_price +
                ", item_category='" + itemCategory + '\'' +
                ", item_description='" + item_description + '\'' +
                ", seller_name='" + seller_name + '\'' +
                ", seller_phone='" + sellerPhone + '\'' +
                ", posted_date=" + postedDate +
                '}';
    }
}
