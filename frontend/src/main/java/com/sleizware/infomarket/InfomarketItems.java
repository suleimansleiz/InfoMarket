package com.sleizware.infomarket;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Document(collection = "items")
@Data
@NoArgsConstructor
public class InfomarketItems {
    @Id
    private ObjectId _id;

    @Field("post_name")
    private String post_name;

    @Field("post_category")
    private String post_category;

    @Field("post_price")
    private String post_price;

    @Field("post_description")
    private String post_description;

    @Field("seller_name")
    private String seller_name;

}


