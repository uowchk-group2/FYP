package com.example.fypbackend.dao.delivery;

import com.example.fypbackend.entity.DeliveryNote;
import com.example.fypbackend.entity.DeliveryStatus;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class DeliveryStatusDAOService implements DeliveryStatusDAO {

    private EntityManager entityManager;

    @Autowired
    public DeliveryStatusDAOService(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void newDeliveryStatus(DeliveryStatus deliveryStatus) {
        Session currentSession = entityManager.unwrap(Session.class);
        currentSession.saveOrUpdate(deliveryStatus);
    }

    @Override
    public void batchNewDeliveryStatus(List<DeliveryStatus> deliveryStatuses) {
        Session currentSession = entityManager.unwrap(Session.class);
        for (DeliveryStatus status : deliveryStatuses) {
            currentSession.saveOrUpdate(status);
        }
    }

    @Override
    public List<DeliveryStatus> getStatusOfNoteId(int deliveryNoteId) {
        Session currentSession = entityManager.unwrap(Session.class);
        Query<DeliveryStatus> query = currentSession.createQuery("from DeliveryStatus o " +
                "WHERE o.deliveryNoteId = '" + deliveryNoteId + "'", DeliveryStatus.class);
        List<DeliveryStatus> resultList = query.getResultList();

        return resultList;
    }
}
