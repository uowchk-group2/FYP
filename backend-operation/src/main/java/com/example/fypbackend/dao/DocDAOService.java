package com.example.fypbackend.dao;

import com.example.fypbackend.entity.DeliveryNote;
import com.example.fypbackend.entity.Document;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class DocDAOService implements DocDAO{

    private EntityManager entityManager;

    @Autowired
    public DocDAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void newDoc(Document document) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(document);
    }

    @Override
    public List<Document> findByOrderId(int orderId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Document> query = currentSession.createQuery( "from Document o " +
                "WHERE o.orderId = '" + orderId + "'", Document.class);
        List<Document> resultList = query.getResultList();

        return resultList;
    }

    @Override
    public List<Document> findByNoteId(int noteId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<Document> query = currentSession.createQuery( "from Document o " +
                "WHERE o.deliveryNoteId = '" + noteId + "'", Document.class);
        List<Document> resultList = query.getResultList();

        return resultList;
    }
}
