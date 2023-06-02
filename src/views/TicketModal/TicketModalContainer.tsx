import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css'
import { useStores } from '../../hooks/useStores';
import { observer } from 'mobx-react';
import Comment from '../../components/Comments/Comment';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Button, DatePicker, Form, Input, Popconfirm, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';

export interface TicketModalContainer {
  isPage?: boolean;
}

const TicketModalContainer: React.FC<TicketModalContainer> = ({isPage}) => {
  const {projectId, ticketId} = useParams();
  const {
    ticketStore, taskTypesStore, taskPrioritiesStore,
    taskStatusesStore, usersStore
  } = useStores();

  const [files, setFiles] = useState<File[]>([])

  const [editMode, setEditMode] = useState(false); 

  const onDrop:(
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => void = useCallback((acceptedFiles) => {
    setFiles([...files, ...acceptedFiles])
  }, [files])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  useEffect(() => {
    taskTypesStore.fetch();
    taskPrioritiesStore.fetch();
    taskStatusesStore.fetch();
    usersStore.fetch()
    if(ticketId && projectId){
      ticketStore.fetch(+projectId, +ticketId)
    }
  }, [])

  if(ticketStore.state.isLoading){
    return <span>Загрузка задачи...</span>
  }

  const onDeleteClickHandle = async () => {
    await ticketStore.delete()
    history.back()
  }

  const onSaveClickHandler = async () => {
    await ticketStore.update();
    setEditMode(false);
    if(ticketId && projectId){
      ticketStore.fetch(+projectId, +ticketId)
    }
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
              {editMode && <Button onClick={onSaveClickHandler}>Сохранить</Button>}
              {!editMode && <AiFillEdit onClick={() => {
                setEditMode(true);
              }} size={16}/>}
              <Popconfirm
                title="Удалить?"
                description="Вы действительно хотите удалить задачу?"
                onConfirm={onDeleteClickHandle}
                okText="Да"
                cancelText="Нет"
              >
                <AiFillDelete size={16} />
              </Popconfirm>
            </div>
          </div>
          <div className="TicketModal__statuses">
            <div className="TicketModal__statuses_column">
              <div className="TicketModal__row">
                <div className="TicketModal__type_title">
                  Тип:
                </div>
                <div className="TicketModal__type_value">
                  {editMode 
                    ? <Select 
                        options={taskTypesStore.options} 
                        value={ticketStore.typeCode}
                        onChange={(value, item) => {
                          if(!Array.isArray(item)){
                            ticketStore.typeCode = item.value;
                            ticketStore.typeName = item.label;
                          }
                        }}  
                      /> 
                    : ticketStore.typeName ?? '-'}
                </div>
              </div>
              <div className="TicketModal__row">
              <div className="TicketModal__priority_title">
                  Приоритет:
                </div>
                <div className="TicketModal__priority_value">
                  {editMode
                    ? <Select 
                        options={taskPrioritiesStore.options}
                        value={ticketStore.priorityCode}
                        onChange={(value, item) => {
                          if(!Array.isArray(item)){
                            ticketStore.priorityCode = item.value;
                            ticketStore.priorityName = item.label;
                          }
                        }}
                      />
                    :ticketStore.priorityName ?? '-'}
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
                {editMode 
                  ? <Select 
                      options={taskStatusesStore.options}
                      value={ticketStore.statusCode}
                      onChange={(value, item) => {
                        if(!Array.isArray(item)){
                          ticketStore.statusCode = item.value;
                          ticketStore.statusName = item.label;
                        }
                      }}
                    />
                  : ticketStore.statusName ?? '-'}
              </div>
            </div>
          </div>
        </div>
        <div className="TicketModal__description">
          <Form layout='vertical'>
            <Form.Item label="Описание">
              <TextArea 
                value={ticketStore.description} 
                onChange={editMode ? (e) => {
                  ticketStore.description = e.target.value;
                } : undefined}/>
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
              <div>Исполнитель:</div>
              <div className='TicketModal__select'>
                {editMode 
                 ? <Select
                    options={usersStore.options}
                    value={ticketStore.assigneeId}
                    onChange={(value, item) => {
                      if(!Array.isArray(item)){
                        ticketStore.assigneeId = item.value;
                        ticketStore.assigneeName = item.label
                      }
                    }} 
                    />
                 : ticketStore.assigneeName ?? '-'}
              </div>
            </div>
            <div className="TicketModal__author_row">
              <div>Проверяющий:</div><div className='TicketModal__select'>
                {editMode ? <Select
                    options={usersStore.options}
                    value={ticketStore.supervisorId}
                    onChange={(value, item) => {
                      if(!Array.isArray(item)){
                        ticketStore.supervisorId = item.value;
                        ticketStore.supervisorName = item.label
                      }
                    }} 
                    /> 
                  : ticketStore.supervisorName ?? '-'}</div>
            </div>
          </div>
          <div className="TicketModal__dates">
            <Form layout='vertical' className="TicketModal__datesForm">
              <div className="TicketModal__dates_column">
                <Form.Item label="План. дата начала">
                  <DatePicker 
                    value={ticketStore.dateStartPlanFormatted} 
                    onChange={editMode 
                    ? (value) => {
                      ticketStore.dateStartPlan = value?.format();
                    } 
                    : undefined} 
                  />
                </Form.Item>
                <Form.Item label="Факт. дата начала">
                  <DatePicker 
                    value={ticketStore.dateStartFactFormatted}
                    onChange={editMode 
                      ? (value) => {
                        ticketStore.dateStartFact = value?.format();
                      } 
                      : undefined}  
                  />
                </Form.Item>
                <Form.Item label="Потрачено факт.">
                  <Input 
                    value={ticketStore.sumHoursFact ?? '-'} 
                    type='number'
                    onChange={editMode 
                      ? (e) => {ticketStore.sumHoursFact = parseInt(e.target.value)} 
                      : undefined} 
                  />
                </Form.Item>
              </div>
              <div className="TicketModal__dates_column">
                <Form.Item label="План. дата конца">
                  <DatePicker 
                    value={ticketStore.dateFinishPlanFormatted}
                    onChange={editMode 
                      ? (value) => {
                        ticketStore.dateFinishPlan = value?.format();
                      } 
                      : undefined}   
                  />
                </Form.Item>
                <Form.Item label="Факт. дата конца">
                  <DatePicker 
                    value={ticketStore.dateFinishFactFormatted}
                    onChange={editMode 
                      ? (value) => {
                        ticketStore.dateFinishFact = value?.format();
                      } 
                      : undefined}   
                  />
                </Form.Item>
                <Form.Item label="Из запл.">
                  <Input 
                    value={ticketStore.sumHoursPlan ?? '-'}
                    type="number"
                    onChange={editMode 
                      ? (e) => { ticketStore.sumHoursPlan = parseInt(e.target.value)}
                      : undefined
                    }
                  />
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="TicketModal__files">
        <div className="TicketModal__files_table">
          {files.map(file => (
            <div className='TicketModal__files_file'>{file.name}</div>
          ))}
        </div>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ?
            <p>Отпустите файл здесь ...</p> :
            <p>Перенесите файлы сюда или нажмите для загрузки</p>
          }
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
