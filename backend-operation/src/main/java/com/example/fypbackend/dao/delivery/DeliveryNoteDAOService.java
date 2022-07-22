package com.example.fypbackend.dao.delivery;

import com.example.fypbackend.entity.DeliveryNote;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class DeliveryNoteDAOService implements DeliveryNoteDAO{

    private EntityManager entityManager;

    @Autowired
    public DeliveryNoteDAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void newDeliveryNote(DeliveryNote deliveryNote) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(deliveryNote);
    }

    @Override
    public DeliveryNote findByDeliveryNoteId(int deliveryNoteId) {
        Session currentSession = entityManager.unwrap(Session.class);
        DeliveryNote deliveryNote = currentSession.get(DeliveryNote.class, deliveryNoteId);
        if (deliveryNote == null){
            deliveryNote = new DeliveryNote();
        }
        return deliveryNote;
    }

    @Override
    public List<DeliveryNote> findByOrderId(int orderId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<DeliveryNote> query = currentSession.createQuery( "from DeliveryNote o " +
                "WHERE o.orderId = '" + orderId + "'", DeliveryNote.class);
        List<DeliveryNote> resultList = query.getResultList();

        return resultList;
    }

    @Override
    public List<DeliveryNote> findByDriverId(int driverId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<DeliveryNote> query = currentSession.createQuery( "from DeliveryNote o " +
                "WHERE o.driverId = '" + driverId + "'", DeliveryNote.class);
        List<DeliveryNote> resultList = query.getResultList();

        return resultList;
    }
}
