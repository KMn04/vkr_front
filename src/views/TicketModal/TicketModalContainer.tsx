import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react';
import Comment from '../../components/Comments/Comment';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs'
import TextArea from 'antd/es/input/TextArea';

const TicketModalContainer: React.FC = () => {
  const {projectId, ticketId} = useParams();
  const {ticketStore} = useStores();

  useEffect(() => {
    console.log(ticketId)
    if(ticketId && projectId){
      ticketStore.fetch(+projectId, +ticketId)
    }
  }, [])

  if(ticketStore.state.isLoading){
    return <span>Загрузка задачи...</span>
  }

  return (
    <div className="TicketModal">
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
                  Задача
                </div>
              </div>
              <div className="TicketModal__row">
              <div className="TicketModal__priority_title">
                  Приоритет:
                </div>
                <div className="TicketModal__priority_value">
                  Высокий
                </div>
              </div>
            </div>
            <div className="TicketModal__statuses_column">
            <div className="TicketModal__row">
              <div className="TicketModal__project_title">
                Проект:
              </div>
              <div className="TicketModal__project_value">
                Проект 1
              </div>
            </div>
            <div className="TicketModal__row">
              <div className="TicketModal__status_title">
                Статус:
              </div>
              <div className="TicketModal__status_value">
                В работе
              </div>
            </div>
          </div>
        </div>
        <div className="TicketModal__description">
          <Form layout='vertical'>
            <Form.Item label="Описание">
              <TextArea value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"} />
            </Form.Item>
          </Form>
        </div>
      </div>
        <div className="TicketModal__additional">
          <div className="TicketModal__authors">
            <div className="TicketModal__author_row"><div>Автор:</div><div>Тамара Ивановна</div></div>
            <div className="TicketModal__author_row"><div>Исполнитель:</div><div>Сидоров Аркадий</div></div>
            <div className="TicketModal__author_row"><div>Проверяющий:</div><div>Петров Петр</div></div>
          </div>
          <div className="TicketModal__dates">
            <div className="TicketModal__row">
              <div className="TicketModal__item_title">
                Спринт: 
              </div>
              <div className="TicketModal__item_value">
                Дипломный
              </div>
            </div>
            <Form layout='vertical' className="TicketModal__datesForm">
              <div className="TicketModal__dates_column">
                <Form.Item label="План. дата начала">
                  <DatePicker value={dayjs()}></DatePicker>
                </Form.Item>
                <Form.Item label="Факт. дата начала">
                  <DatePicker value={dayjs()}></DatePicker>
                </Form.Item>
                <Form.Item label="Потрачено факт.">
                  <Input value={"3ч"} />
                </Form.Item>
              </div>
              <div className="TicketModal__dates_column">
                <Form.Item label="План. дата конца">
                  <DatePicker value={dayjs()}></DatePicker>
                </Form.Item>
                <Form.Item label="Факт. дата конца">
                  <DatePicker value={dayjs()}></DatePicker>
                </Form.Item>
                <Form.Item label="Из запл.">
                  <Input value={"5ч"} />
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="TicketModal__comments">
        <Comment/>
      </div>
    </div>
  );
}

export default observer(TicketModalContainer)
