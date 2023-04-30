import React, { useEffect, useState } from 'react';
import './styles.css'
import { Button } from 'antd';
import { useStores } from '../../hooks/useStores';
import Modal from '../../views/Modal/Modal';
import CreateWikiPage from '../CreateWikiPage/CreateWikiPage';
import { observer } from 'mobx-react';

interface WikiDirectoryProps {
  projectId: number
}

const WikiDirectory: React.FC<WikiDirectoryProps> = ({projectId}) => {
  const {projectWikiStore} = useStores();
  const [isShowAddPage, setShowAddPage] = useState(false);

  const openCreateFormHandle = () => {
    setShowAddPage(true)
  }

  const closeCreateFormHandle = () => {
    setShowAddPage(false)
  }

  useEffect(() => {
    projectWikiStore.fetch(projectId)
  }, [])

  if(!projectWikiStore.projectId){
    return (<div>А какой номер проекта?</div>)
  }

  return (
    <div className="WikiDirectory">
      <div className="WikiDirectory__title">База знаний</div>
      <Button 
        onClick={openCreateFormHandle} 
        className="WikiDirectory__addButton"
      >
        Добавить страницу
      </Button>
      <div className="WikiDirectory__pages">
        {projectWikiStore.pages.map((page) => (
          <div className="WikiDirectory__page">
            {page.title}
          </div>
        ))}
      </div>
      {isShowAddPage && (
        <Modal onClickOutside={closeCreateFormHandle}>
          <CreateWikiPage 
            onClose={closeCreateFormHandle} 
            projectId={projectWikiStore.projectId}
          />
        </Modal>
      )}
    </div>
  );
}

export default observer(WikiDirectory); 