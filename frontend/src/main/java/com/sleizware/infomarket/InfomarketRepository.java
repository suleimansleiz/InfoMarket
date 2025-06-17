package com.sleizware.infomarket;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InfomarketRepository extends MongoRepository<InfomarketItems, ObjectId> {
}
