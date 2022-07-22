package com.example.fypbackend.dao;

import com.example.fypbackend.entity.Document;

import java.util.List;

public interface DocDAO {

    public void newDoc(Document document);

    public List<Document> findByOrderId(int orderId);

    public List<Document> findByNoteId(int noteId);

}
