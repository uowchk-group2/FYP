package com.example.fypbackend.service;

import com.example.fypbackend.entity.Document;

import java.util.List;

public interface DocServices {

    public void newDoc(Document document);

    public List<Document> findByOrderId(int orderId);

    public List<Document> findByNoteId(int noteId);

}
