import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react';
import Comment from '../../components/Comments/Comment';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { DatePicker, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

export interface TicketModalContainer {
  isPage?: boolean;
}

const TicketModalContainer: React.FC<TicketModalContainer> = ({isPage}) => {
  const {projectId, ticketId} = useParams();
  const {ticketStore} = useStores();

  useEffect(() => {
    if(ticketId && projectId){
      ticketStore.fetch(+projectId, +ticketId)
    }
  }, [])

  if(ticketStore.state.isLoading){
    return <span>Загрузка задачи...</span>
  }

  return (
    <div className={`TicketModal ${isPage? 'TicketModal__page' : ''}`}>
      <div className="TicketModal__content">
        <div className="TicketModal__MainInfo">
          <div className="TicketModal__toolbar">
            <div className="TicketModal__title">
              Название: {ticketStore.name}
            </div>
            <div className="TicketModal__actions">
              <AiFillEdit size={16}/>
              <AiFillDelete size={16} />
            </div>
          </div>
          <div className="TicketModal__statuses">
            <div className="TicketModal__statuses_column">
              <div className="TicketModal__row">
                <div className="TicketModal__type_title">
                  Тип:
                </div>
                <div className="TicketModal__type_value">
                  {ticketStore.typeName ?? '-'}
                </div>
              </div>
              <div className="TicketModal__row">
              <div className="TicketModal__priority_title">
                  Приоритет:
                </div>
                <div className="TicketModal__priority_value">
                  {ticketStore.priorityName ?? '-'}
                </div>
              </div>
            </div>
            <div className="TicketModal__statuses_column">
            <div className="TicketModal__row">
              <div className="TicketModal__project_title">
                Проект:
              </div>
              <div className="TicketModal__project_value">
                {ticketStore.projectName ?? '-'}
              </div>
            </div>
            <div className="TicketModal__row">
              <div className="TicketModal__status_title">
                Статус:
              </div>
              <div className="TicketModal__status_value">
                {ticketStore.statusName ?? '-'}
              </div>
            </div>
          </div>
        </div>
        <div className="TicketModal__description">
          <Form layout='vertical'>
            <Form.Item label="Описание">
              <TextArea value={ticketStore.description} />
            </Form.Item>
          </Form>
        </div>
      </div>
        <div className="TicketModal__additional">
          <div className="TicketModal__authors">
            <div className="TicketModal__author_row">
              <div>Автор:</div><div>{ticketStore.authorName ?? '-'}</div>
            </div>
            <div className="TicketModal__author_row">
              <div>Исполнитель:</div><div>{ticketStore.assigneeName ?? '-'}</div>
            </div>
            <div className="TicketModal__author_row">
              <div>Проверяющий:</div><div>{ticketStore.supervizorName ?? '-'}</div>
            </div>
          </div>
          <div className="TicketModal__dates">
            <Form layout='vertical' className="TicketModal__datesForm">
              <div className="TicketModal__dates_column">
                <Form.Item label="План. дата начала">
                  <DatePicker value={ticketStore.dateStartPlanFormatted}></DatePicker>
                </Form.Item>
                <Form.Item label="Факт. дата начала">
                  <DatePicker value={ticketStore.dateStartFactFormatted}></DatePicker>
                </Form.Item>
                <Form.Item label="Потрачено факт.">
                  <Input value={ticketStore.sumHoursFact ?? '-'} />
                </Form.Item>
              </div>
              <div className="TicketModal__dates_column">
                <Form.Item label="План. дата конца">
                  <DatePicker value={ticketStore.dateFinishPlanFormatted}></DatePicker>
                </Form.Item>
                <Form.Item label="Факт. дата конца">
                  <DatePicker value={ticketStore.dateFinishFactFormatted}></DatePicker>
                </Form.Item>
                <Form.Item label="Из запл.">
                  <Input value={ticketStore.sumHoursPlan ?? '-'} />
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="TicketModal__comments">
        {ticketStore.comments?.map(comment => (
          <Comment comment={comment} key={comment.commentId}/>
        ))}
        <Comment 
          onUpdate={() => {ticketStore.fetchComments()}} 
          ticketId={ticketStore.id}
        />
      </div>
    </div>
  );
}

export default observer(TicketModalContainer)
